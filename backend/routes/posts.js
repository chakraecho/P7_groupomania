const express= require('express')
const router = express.Router()

const postCtlr = require('./../controllers/post')


router.get('/', postCtlr.getAll)
router.post('/submit', postCtlr.createOne)
router.put('/:id', postCtlr.modifyOne)
router.delete('/:id', postCtlr.deleteOne)

module.exports = router