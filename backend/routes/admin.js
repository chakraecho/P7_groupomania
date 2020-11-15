const express = require('express')
const router = express.Router()
const adminCtrl = require('./../controllers/admin')

const {isLoggedIn} = require('./../middleware/auth/user')
const {isAdminUser} = require('./../middleware/auth/admin')

router.get('/list', isLoggedIn, isAdminUser, adminCtrl.getAll)

router.post('/alert/:id',isLoggedIn, isAdminUser, adminCtrl.createAlert)

router.delete('/alert/:id',isLoggedIn,isAdminUser, adminCtrl.delete)

module.exports = router