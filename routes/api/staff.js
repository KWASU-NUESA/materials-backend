const express = require('express')
const router = express.Router()
const {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff} = require('../../controllers/staffController')
const routeprotect = require('../../middleware/normsprotect')

//remember not to use jwt for staffs || use routeprotect instead
router.route('/')
    .get(getAllStaff)
    .post( createNewStaff)
    .put(updateStaff)
    .delete(deleteStaff)
 
router.route('/:id')
    .get(getSingleStaff)


module.exports = router