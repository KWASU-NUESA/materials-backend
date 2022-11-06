const express = require('express')
const router = express.Router()
const {deleteStaff, updateStaff, createNewStaff, getAllStaff, getSingleStaff} = require('../../controllers/staffController')
const jwtverify = require('../../middleware/verifyJwt')
const ROLES_LIST = require("../../config/roles_list")
const verifyroles = require('../../middleware/verifyroles')

router.route('/:id')
    .get(getSingleStaff)

router.route('/')
    .get(getAllStaff)
    .post(jwtverify, verifyroles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewStaff)
    .put(jwtverify, verifyroles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateStaff)
    .delete(jwtverify, verifyroles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteStaff)
 



module.exports = router