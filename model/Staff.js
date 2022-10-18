const mongoose = require('mongoose')
const schema = mongoose.Schema

const staffSchema = new schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }   
},{timestamps: true})

module.exports = mongoose.model('staff', staffSchema)