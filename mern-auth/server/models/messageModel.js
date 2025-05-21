const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: String,
    sentAt: Date,
})

module.exports = mongoose.model("Message", messageSchema)