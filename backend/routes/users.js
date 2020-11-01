const express = require('express');
const router = express.Router();
const {limit20, limit400} = require('./../middleware/express-limit')

const userCtrl = require('./../controllers/users')
const postCtrl = require('./../controllers/post')
const followCtrl = require('./../controllers/follow')
const notifCtrl = require('./../controllers/noctification')
const searchCtrl = require('./../controllers/search')

const {isLoggedIn, isUser} = require('./../middleware/auth/user')

const multer = require('./../middleware/multer-config')

router.post('/auth/signup',limit20, userCtrl.signup)
router.post('/auth/login',limit20,  userCtrl.login)
router.post('/auth/verify',limit400, userCtrl.verify)

router.get('/search',limit400, isLoggedIn, searchCtrl.searchUser)

router.put("/account/:id",limit400, isLoggedIn, isUser, userCtrl.modify)
router.put('/account/:id/profil',limit400, isLoggedIn, isUser, multer, userCtrl.changeImg)
router.put('/account/:id/banner',limit400, isLoggedIn, isUser, multer,  userCtrl.changeBanner)

router.get('/:id',limit400,  userCtrl.getUser)

router.get('/:id/post',limit400, isLoggedIn, postCtrl.userPost)

router.get('/notification/:id',limit400, isLoggedIn, isUser, notifCtrl.getAll)

router.get('/follow/:id',limit400, isLoggedIn, followCtrl.followOne)
router.get('/follow/check/:id',limit400, isLoggedIn, followCtrl.checkFollow)


router.delete('/follow/:id',limit400, isLoggedIn, followCtrl.deleteFollow)
router.delete('/delete',limit400, isLoggedIn, userCtrl.delete)
router.delete('/disconnect', limit400, userCtrl.disconnect)


module.exports = router;