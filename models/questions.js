const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    option0: {
        type: String,
        required: true,
    },
    option1: {
        type: String,
        required: true,
    },
    option2: {
        type: String,
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Question", questionsSchema);