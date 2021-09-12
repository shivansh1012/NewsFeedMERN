const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    articles:{
        type: Array,
        default: []
    }
})

const Author = mongoose.model("author", authorSchema, "author");

module.exports = Author;