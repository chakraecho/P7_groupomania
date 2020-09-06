const express = require('express')
const router = express.Router()

const groupCtrl = require('./../controllers/group')

router.post('/', groupCtrl.createGroup)
router.post('/:id', groupCtrl.addMember)

module.exports = router