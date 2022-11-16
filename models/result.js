const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    result: {
        type: Array,
        default: []
    },
    attempts: {
        type: Number,
        default: 0,
    },
    points: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model("Result", resultSchema);