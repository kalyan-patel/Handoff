const mongoose = require('mongoose')

const userSchema = new mongoose.schema({

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)