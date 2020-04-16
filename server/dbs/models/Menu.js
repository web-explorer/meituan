const mongoose = require('mongoose')
const Schema = mongoose.Schema
const menusSchema = new Schema({
  menu: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('Menu', menusSchema)
