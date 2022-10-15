const express = require('express')
const router = express.Router()
const {show404, showDocs} = require('../controllers/staticsController')

router.get('/docs',showDocs)
router.all('*',show404)

module.exports = router