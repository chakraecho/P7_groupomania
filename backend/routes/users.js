const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/users')
const postCtrl = require('./../controllers/post')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.post('/auth/verify', userCtrl.verify)

router.put('/change/profil', userCtrl.changeImg)
router.put('/change/banner', userCtrl.changeBanner)

router.get('/:id', userCtrl.getUser)

router.get('/:id/post', postCtrl.userPost)

module.exports = router;