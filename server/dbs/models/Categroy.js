const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const categroysSchema= new Schema({
  types: {
    type: Array
  },
  areas: {
    type: Array
  },
  city: {
    type: String
  }
})

module.exports = mongoose.model('Categroy', categroysSchema) // collection名一般为categroys


