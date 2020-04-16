const Router = require('koa-router')
const axios = require('axios')

const Menu = require('./../dbs/models/Menu')
const Province = require('./../dbs/models/Province')
const City = require('./../dbs/models/City')

let router = new Router({
  prefix: '/geo'
})

const sign = ''

router.get('/getPosition', async ctx => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if(status == 200){
    ctx.body = {
      province,
      city
    }
  }else{
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/hotCity', async ctx => {
  let {status, data: {
    hots: hotPlace
  }} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      hotPlace
    }
  } else {
    ctx.body = {
      hotPlace: []
    }
  }
})

router.get('/menu', async ctx => {
  // 线上数据
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if(status == 200){
    ctx.body = {
      menu
    }
  }else{
    ctx.body = {
      menu: []
    }
  }
  // 本地数据库中数据
  /*let menu = await Menu.findOne()
  if(menu){
    ctx.body = menu
  }else{
    ctx.body = []
  }*/
})

router.get('/province', async ctx => {
  // 线上数据
  let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status == 200 ? province : []
  }
  return

  // 本地数据库中数据
  /*let province = await Province.find()
  ctx.body = {
    province: province.map(item => ({
      id: item.id,
      name: item.value
    }))
  }
  return*/
})

router.get('/province/:id', async ctx => {
  // 本地数据库中数据
  /*let city = await City.findOne({id: ctx.params.id})
  ctx.body = {
    city: city.value.map(item => {
      return {province: item.province, id: item.id, name: item.name}
    })
  }
  return*/

  // 线上数据
  let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
  return
})

router.get('/city', async ctx => {
  // 本地数据库中数据
  /*let city = []
  let result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })
  ctx.body = {
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
  return*/

  // 线上数据
  let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
  return
})

router.get('/hotCity', async (ctx) => {
  let {status, data: {hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
  return
})

module.exports = router
