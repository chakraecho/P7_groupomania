const express= require('express')
const router = express.Router()

const postCtlr = require('./../controllers/post')


router.get('/', postCtlr.getAll)
router.post('/submit', postCtlr.createOne)
router.put('/:id', postCtlr.modifyOne)
router.delete('/:id', postCtlr.deleteOne)

router.get('/:id/comment', postCtlr.getComment)
router.post('/:id/comment',postCtlr.createComment)
router.put('/:id/comment', postCtlr.modifyComment)
router.delete('/:id/comment', postCtlr.deleteComment)


router.post('/:id/like', postCtlr.like)
router.post('/comment/:id/like', postCtlr.commentLike)
module.exports = router