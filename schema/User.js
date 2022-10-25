const mongoose = require("mongoose")

const User =  new mongoose.Schema({
    name: String,
    email: String,
    balance: {
        type: Number,
        default: 0
    }
})

module.exports =  mongoose.model("user", User)