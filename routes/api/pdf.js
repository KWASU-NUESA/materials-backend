const express = require('express')
const router = express.Router()
const {updatePDF, getAllPdf, deletePDF, createNewPDF, deleteOneFile} = require('../../controllers/pdfController')
const jwtverify = require('../../middleware/verifyJwt')

router.route('/')
    .get(getAllPdf)
    .post(jwtverify, createNewPDF)
    .put(jwtverify, updatePDF)
    .delete(jwtverify, deletePDF)

router.delete('/:id&:index&:category', jwtverify, deleteOneFile)
module.exports = router