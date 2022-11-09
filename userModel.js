const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        avatar:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        }
    },
)

const userModel = mongoose.model("user", userSchema)
module.exports = userModel