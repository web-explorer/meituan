const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const poisSchema = new Schema({
  name: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  areaCode: {
    type: Number
  },
  tel: {
    type: String
  },
  area: {
    type: String,
    require: true
  },
  add: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longtide: {
    type: Number
  },
  latitude: {
    type: Number
  }
})

module.exports = mongoose.model('Poi', poisSchema)


