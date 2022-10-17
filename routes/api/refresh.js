const express = require('express')
const router = express.Router()
const handlerefreshtoken = require('../../controllers/refreshTokenController')

router.route('/')
    .get(handlerefreshtoken)

module.exports = router