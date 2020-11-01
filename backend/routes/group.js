const express = require('express')
const router = express.Router()
const multer = require('./../middleware/multer-config')


const groupCtrl = require('./../controllers/group')
const postCtrl = require('./../controllers/post')
const searchCtrl = require('./../controllers/search')

const {isLoggedIn} = require('./../middleware/auth/user')
const {isAdmin} = require('./../middleware/auth/group')

router.post('/', isLoggedIn, multer, groupCtrl.createGroup)
router.post('/:id', isLoggedIn, groupCtrl.addMember)
router.post('/:id/submit', isLoggedIn, multer,  postCtrl.postGroup)
router.put('/:id', isLoggedIn, isAdmin, groupCtrl.modifyGroup)
router.put('/:id/img',  isLoggedIn,isAdmin,  multer,groupCtrl.modifyImg)
router.put('/:id/banner', isLoggedIn,isAdmin,  multer, groupCtrl.modifyBanner)

router.get('/search',isLoggedIn, searchCtrl.findGroup)

router.get('/list',isLoggedIn, groupCtrl.getOwnGroups)
router.get('/:id',isLoggedIn, groupCtrl.getOneGroup)
router.get('/:id/post',isLoggedIn, postCtrl.getAllfromGroups)


router.delete('/:id',isLoggedIn,isAdmin,  groupCtrl.deleteGroup)

module.exports = router