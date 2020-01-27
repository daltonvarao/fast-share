const mongoose = require('mongoose')

const ShareSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Share', ShareSchema)
