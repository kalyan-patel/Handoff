const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  imgPaths: {
    type: [String],
    required: true
  },
  user: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model("Listing", listingSchema)