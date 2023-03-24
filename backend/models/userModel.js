const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  upvotes: {
    type: [],
    required: false
  },
  downvotes: {
    type: [],
    required: false
  },
  submitted_urls: {
    type: [],
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)