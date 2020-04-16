const Router = require('koa-router')
const axios = require('./utils/axios')
const Categroy = require('./../dbs/models/Categroy')

let router = new Router({prefix: '/categroy'})

const sign = ''

router.get('/crumbs', async ctx => {
  // 线上数据
  /*let {status, data: {areas, types}} = await axios.get('http://cp-tools.cn/category/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '北京',
      sign
    }
  })
  ctx.body = {
    areas: status == 200 ? areas : [],
    types: status == 200 ? types : []
  }
  return*/

  // 本地数据库中数据
  let result = await Categroy.findOne({city: ctx.query.city.replace('市', '') || '淮安'})
  ctx.body = result
})

module.exports = router
