const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    matric:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('user', userSchema)