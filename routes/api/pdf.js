const express = require('express')
const router = express.Router()
const {updatePDF, getAllPdf, deletePDF, createNewPDF, deleteOneFile} = require('../../controllers/pdfController')

router.route('/')
    .get(getAllPdf)
    .post(createNewPDF)
    .put(updatePDF)
    .delete(deletePDF)

router.get('/:id&:index&:category', deleteOneFile)
module.exports = router