const express= require('express')
const router = express.Router()
const multer = require('./../middleware/multer-config')

const postCtlr = require('./../controllers/post')
const searchCtrl = require('./../controllers/search')


router.get('/', postCtlr.getAll)
router.post('/submit',multer,  postCtlr.createOne)
router.put('/:id',multer, postCtlr.modifyOne)
router.delete('/:id', postCtlr.deleteOne)

router.get('/search', searchCtrl.searchPost)

router.get('/:id/comment', postCtlr.getComment)
router.post('/:id/comment',postCtlr.createComment)
router.put('/:id/comment', postCtlr.modifyComment)
router.delete('/:id/comment', postCtlr.deleteComment)


router.post('/:id/like', postCtlr.like)
router.post('/comment/:id/like', postCtlr.commentLike)
module.exports = router