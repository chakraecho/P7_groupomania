const express= require('express')
const router = express.Router()

const postCtlr = require('./../controllers/post')


router.get('/', postCtlr.getAll)
router.post('/submit', postCtlr.createOne)

module.exports = router