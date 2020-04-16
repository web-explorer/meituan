const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const usersSchema = new Schema({
  username: {
    type: String,
    unique: true, // users表中username字段是唯一的
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('User', usersSchema)


