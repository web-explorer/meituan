const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const cartsSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  products: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('Cart', cartsSchema)


