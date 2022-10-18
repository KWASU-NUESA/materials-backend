const express = require('express')
const router = express.Router()
const {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff} = require('../../controllers/staffController')
// const jwtverify = require('../../middleware/verifyJwt')
// const routeprotect = require('../../middleware/normsprotect')
// const ROLES_LIST = require("../../config/roles_list")
// const verifyroles = require('../../middleware/verifyroles')
//remember not to use jwt for staffs || use routeprotect instead
router.route('/')
    .get(getAllStaff)
    .post(createNewStaff)
    .put(updateStaff)
    .delete(deleteStaff)
    // .get(routeprotect, getAllStaff)
    // .post(jwtverify,  createNewStaff)
    // .put(jwtverify,  updateStaff)
    // .delete(jwtverify,  deleteStaff)
 
router.route('/:id')
    .get(getSingleStaff)


module.exports = router