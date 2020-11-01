const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/users')
const postCtrl = require('./../controllers/post')
const followCtrl = require('./../controllers/follow')
const notifCtrl = require('./../controllers/noctification')
const searchCtrl = require('./../controllers/search')

const userSecurity = require('./../middleware/auth/user')

const multer = require('./../middleware/multer-config')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.post('/auth/verify', userCtrl.verify)

router.get('/search',userSecurity.isLoggedIn, searchCtrl.searchUser)

router.put("/account/:id",userSecurity.isLoggedIn, userSecurity.isUser, userCtrl.modify)
router.put('/account/:id/profil',userSecurity.isLoggedIn, userSecurity.isUser, multer, userCtrl.changeImg)
router.put('/account/:id/banner',userSecurity.isLoggedIn, userSecurity.isUser, multer,  userCtrl.changeBanner)

router.get('/:id', userCtrl.getUser)

router.get('/:id/post',userSecurity.isLoggedIn, postCtrl.userPost)

router.get('/notification/:id',userSecurity.isLoggedIn, userSecurity.isUser, notifCtrl.getAll)

router.get('/follow/:id',userSecurity.isLoggedIn, followCtrl.followOne)
router.get('/follow/check/:id',userSecurity.isLoggedIn, followCtrl.checkFollow)


router.delete('/follow/:id',userSecurity.isLoggedIn, followCtrl.deleteFollow)
router.delete('/delete',userSecurity.isLoggedIn, userCtrl.delete)
router.delete('/disconnect', userCtrl.disconnect)


module.exports = router;