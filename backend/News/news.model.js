const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    views: {
        type: Number,
        default: 0,
    }
})

const News = mongoose.model("news", newsSchema, "news");

module.exports = News;