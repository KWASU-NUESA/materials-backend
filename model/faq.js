const mongoose = require('mongoose')
const schema = mongoose.Schema

const faqSchema = new schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('faq', faqSchema)