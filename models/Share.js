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

// ShareSchema.pre("save", function(next) {
//   this.urlID = genRandomId()

//   this.findOne({ urlID: this.urlID })
//     .then(share => {
//       console.log(share)
//     })

//     return next()
// })

module.exports = mongoose.model('Share', ShareSchema)
