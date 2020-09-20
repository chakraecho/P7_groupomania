const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/users')
const postCtrl = require('./../controllers/post')
const followCtrl = require('./../controllers/follow')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.post('/auth/verify', userCtrl.verify)
router.post('/follow', followCtrl.followOne)
router.post('/follow/check', followCtrl.checkFollow)

router.put('/change/profil', userCtrl.changeImg)
router.put('/change/banner', userCtrl.changeBanner)

router.get('/:id', userCtrl.getUser)

router.get('/:id/post', postCtrl.userPost)

router.delete('/disconnect', userCtrl.disconnect)
router.delete('/follow', followCtrl.deleteFollow)

module.exports = router;