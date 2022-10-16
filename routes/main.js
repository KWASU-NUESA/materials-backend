const express = require('express')
const router = express.Router()
const showDocs = require('../controllers/staticsController')

router.get('/docs',showDocs)

module.exports = router