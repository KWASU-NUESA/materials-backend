const mongoose = require('mongoose')
const schema = mongoose.Schema

const pdfSchema = new schema({
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    textbooks: {
        type: [String]
    },
    questions: {
        type: [String]
    }
}, {timestamps: true})

module.exports = mongoose.model('pdf', pdfSchema)