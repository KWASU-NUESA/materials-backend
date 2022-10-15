const express = require('express')
const router = express.Router()
const handlelogin = require('../../controllers/authController')

router.route('/')
    .post(handlelogin)

    module.exports = router