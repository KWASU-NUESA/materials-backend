const express = require('express')
const router = express.Router()
const handlelogout = require('../../controllers/logout')

router.route('/')
    .get(handlelogout)

module.exports = router