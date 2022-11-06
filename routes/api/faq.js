const router = require('express').Router()
const {getAllFaq, NewFaq, deleteFaq} = require('../../controllers/Faq')
const verifyJWT = require('../../middleware/verifyJwt')

router.route('/')
                .get(getAllFaq)
                .post(verifyJWT, NewFaq)
                .delete(verifyJWT, deleteFaq)

module.exports = router