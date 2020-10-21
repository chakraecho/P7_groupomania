const express = require('express')
const router = express.Router()
const multer = require('./../middleware/multer-config')


const groupCtrl = require('./../controllers/group')
const postCtrl = require('./../controllers/post')

router.post('/', multer, groupCtrl.createGroup)
router.post('/:id', groupCtrl.addMember)
router.post('/:id/submit', postCtrl.postGroup)
router.put('/:id', groupCtrl.modifyGroup)
router.put('/:id/img', groupCtrl.modifyImg)
router.put('/:id/banner', groupCtrl.modifyBanner)

router.get('/list', groupCtrl.getOwnGroups)
router.get('/:id', groupCtrl.getOneGroup)
router.get('/:id/post', postCtrl.getAllfromGroups)

router.delete('/:id', groupCtrl.deleteGroup)

module.exports = router