const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/users')
const postCtrl = require('./../controllers/post')
const followCtrl = require('./../controllers/follow')
const notifCtrl = require('./../controllers/noctification')
const searchCtrl = require('./../controllers/search')

const {isLoggedIn, isUser} = require('./../middleware/auth/user')

const multer = require('./../middleware/multer-config')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.post('/auth/verify', userCtrl.verify)

router.get('/search',isLoggedIn, searchCtrl.searchUser)

router.put("/account/:id",isLoggedIn, isUser, userCtrl.modify)
router.put('/account/:id/profil',isLoggedIn, isUser, multer, userCtrl.changeImg)
router.put('/account/:id/banner',isLoggedIn, isUser, multer,  userCtrl.changeBanner)

router.get('/:id', userCtrl.getUser)

router.get('/:id/post',isLoggedIn, postCtrl.userPost)

router.get('/notification/:id',isLoggedIn, isUser, notifCtrl.getAll)

router.get('/follow/:id',isLoggedIn, followCtrl.followOne)
router.get('/follow/check/:id',isLoggedIn, followCtrl.checkFollow)


router.delete('/follow/:id',isLoggedIn, followCtrl.deleteFollow)
router.delete('/delete',isLoggedIn, userCtrl.delete)
router.delete('/disconnect', userCtrl.disconnect)


module.exports = router;