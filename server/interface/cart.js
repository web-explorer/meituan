const Router = require('koa-router')
const Cart = require('./../dbs/models/Cart')

let router = new Router({prefix: '/cart'})

router.post('/add', async ctx => {
  const {product, num} = ctx.request.body
  const user = ctx.session.passport.user
  let cart = await Cart.findOne({userId: user._id})
  if (!cart) {
    const newCart = await new Cart({
      userId: user._id,
      products: [
        {product, num}
      ]
    }).save()
    ctx.body = {
      code: 0
    }
  } else {
    const index = cart.products.findIndex(item => product.id == item.product.id)
    if (index > -1) {
      cart.products[index].num++
      cart = await cart.save()
      ctx.body = {
        code: 0
      }
    } else {
      cart.products.unshift({product, num})
      cart = await cart.save()
      ctx.body = {
        code: 0
      }
    }
  }
})

router.get('/detail', async ctx => {
  const user = ctx.session.passport.user
  let cart = await Cart.findOne({userId: user._id})
  ctx.body = {
    code: 0,
    data: {
      products: cart.products
    }
  }
})

module.exports = router
