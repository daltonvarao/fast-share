const mongoose = require('mongoose')
// const genRandomId = require('../utils/randomId')

const ShareSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  urlID: {
    type: String,
    default: ''
  }
})


module.exports = mongoose.model('Share', ShareSchema)
