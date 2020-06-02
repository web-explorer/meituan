const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
// const session = require('koa-session2')
const redisStore = require('koa-redis')
// const Redis = require('ioredis');
const json = require('koa-json')
const dbConfig = require('./dbs/config')
const passport = require('./interface/utils/passport')

const users = require('./interface/users')
const geo = require('./interface/geo')
const search = require('./interface/search')
const cate= require('./interface/cate')
const cart= require('./interface/cart')

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

app.keys = ['mt', 'keyskeys']
app.proxy = true // porxy头部将被信任

app.use(session({
  prefix: 'meituan:sid',
  key: 'meituan:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 60 * 60 * 1000, /* (number)(default 24 * 60 * 60 * 1000) */
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  store: redisStore()
}, app));

app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
app.use(passport.initialize())
app.use(passport.session())

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = Boolean(process.env.HOST) || '127.0.0.1',
    port = Boolean(process.env.PORT) || 9001
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(cate.routes()).use(cate.allowedMethods())
  app.use(cart.routes()).use(cart.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
