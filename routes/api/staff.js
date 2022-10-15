const express = require('express')
const router = express.Router()
const {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff} = require('../../controllers/staffController')
router.route('/')
    .get(getAllStaff)
    .post(createNewStaff)
    .put(updateStaff)
    .delete(deleteStaff)
 
router.route('/:id')
    .get(getSingleStaff)


module.exports = router