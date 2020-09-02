const express = require('express');
const router = express.Router();

const userCtrl = require('./../controllers/users')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.post('/auth/verify', userCtrl.verify)

router.put('/change/profil', userCtrl.changeImg)
router.put('/change/banner', userCtrl.changeBanner)


module.exports = router;