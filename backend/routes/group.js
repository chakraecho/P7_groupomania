const express = require('express')
const router = express.Router()
const multer = require('./../middleware/multer-config')
const {limit400, limit20} = require('./../middleware/express-limit')


const groupCtrl = require('./../controllers/group')
const postCtrl = require('./../controllers/post')
const searchCtrl = require('./../controllers/search')

const {isLoggedIn} = require('./../middleware/auth/user')
const {isAdmin} = require('./../middleware/auth/group')

router.post('/',limit400, isLoggedIn, multer, groupCtrl.createGroup)
router.post('/:id',limit400, isLoggedIn, groupCtrl.addMember)
router.post('/:id/submit',limit400, isLoggedIn, multer,  postCtrl.postGroup)
router.put('/:id',limit400, isLoggedIn, isAdmin, groupCtrl.modifyGroup)
router.put('/:id/img',limit400,  isLoggedIn,isAdmin,  multer,groupCtrl.modifyImg)
router.put('/:id/banner',limit400, isLoggedIn,isAdmin,  multer, groupCtrl.modifyBanner)

router.get('/search',limit400, isLoggedIn, searchCtrl.findGroup)

router.get('/list',limit400,isLoggedIn, groupCtrl.getOwnGroups)
router.get('/:id',limit400,isLoggedIn, groupCtrl.getOneGroup)
router.get('/:id/post',limit400,isLoggedIn, postCtrl.getAllfromGroups)


router.delete('/:id',limit400,isLoggedIn,isAdmin,  groupCtrl.deleteGroup)

module.exports = router