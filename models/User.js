const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  shares: { 
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Share'
  }
})

module.exports = mongoose.model('User', UserSchema)
