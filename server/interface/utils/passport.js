const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const User = require('./../../dbs/models/User')

passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {
    username
  }
  let result = await User.findOne(where)
  if(result !== null){
    if(result.password === password){
      return done(null, result)
    }else{
      return done(null, false, '密码错误')
    }
  }else{
    return done(null, false, '用户不存在')
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

module.exports = passport
