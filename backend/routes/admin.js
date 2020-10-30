const express = require('express')
const router = express.Router()
const adminCtrl = require('./../controllers/admin')

router.get('/list', adminCtrl.getAll)
router.post("/alert/:id", adminCtrl.createAlert)

router.delete('/alert/:id', adminCtrl.delete)

module.exports = router