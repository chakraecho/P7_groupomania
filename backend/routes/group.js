const express = require('express')
const router = express.Router()

const groupCtrl = require('./../controllers/group')

router.post('/', groupCtrl.createGroup)
router.post('/:id', groupCtrl.addMember)
router.put('/:id', groupCtrl.modifyGroup)
router.put('/:id/img', groupCtrl.modifyImg)
router.put('/:id/banner', groupCtrl.modifyBanner)

router.delete('/:id', groupCtrl.deleteGroup)

module.exports = router