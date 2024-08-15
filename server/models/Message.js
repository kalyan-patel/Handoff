const mongoose = require('mongoose')

const messageSchema = new mongoose.schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model("Message", messageSchema)