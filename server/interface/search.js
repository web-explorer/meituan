const Router = require('koa-router')
const axios = require('axios')
const Poi = require('./../dbs/models/Poi')

let router = new Router({prefix: '/search'})

const sign = ''

router.get('/top', async ctx => {
  const query = ctx.query
  // 线上数据
  let {status, data: {top}} = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      input: query.input,
      city: query.city,
      sign
    }
  })
  ctx.body = {
    top: status == 200 ? top : []
  }
  return
})

router.get('/hotPlace', async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  let {status, data: {result}} = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    hotPlace: status == 200 ? (result.length > 5 ? result.slice(0, 5) : result) : []
  }
  return
})

router.get('/resultsByKeywords', async ctx => {
  const {city, keyword} = ctx.query
  let {status, data: {count, pois}} = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status == 200 ? count : 0,
    pois: status == 200 ? pois : []
  }
})

router.get('/products', async ctx => {
  let keyword = ctx.query.keyword
  let city = ctx.query.city
  let {status, data: {product, more}} = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status == 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
    return
  }
})

module.exports = router
