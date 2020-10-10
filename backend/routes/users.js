const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/users')
const postCtrl = require('./../controllers/post')
const followCtrl = require('./../controllers/follow')
const notifCtrl = require('./../controllers/noctification')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.post('/auth/verify', userCtrl.verify)


router.put('/change/profil', userCtrl.changeImg)
router.put('/change/banner', userCtrl.changeBanner)

router.get('/:id', userCtrl.getUser)

router.get('/:id/post', postCtrl.userPost)

router.get('/notification/:id', notifCtrl.getAll)

router.get('/follow/:id', followCtrl.followOne)
router.get('/follow/check/:id', followCtrl.checkFollow)
router.delete('/follow/:id', followCtrl.deleteFollow)

router.delete('/disconnect', userCtrl.disconnect)


module.exports = router;