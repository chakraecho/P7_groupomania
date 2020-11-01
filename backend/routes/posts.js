const express= require('express')
const router = express.Router()
const multer = require('./../middleware/multer-config')

const postCtlr = require('./../controllers/post')
const searchCtrl = require('./../controllers/search')

const {isLoggedIn} = require('./../middleware/auth/user')
const {isUsersPost, isUsersComment} = require('./../middleware/auth/post')


router.get('/', isLoggedIn, postCtlr.getAll)
router.post('/submit', isLoggedIn,multer,  postCtlr.createOne)
router.put('/:id', isLoggedIn, isUsersPost, multer, postCtlr.modifyOne)
router.delete('/:id', isLoggedIn, isUsersPost, postCtlr.deleteOne)

router.get('/search',isLoggedIn, searchCtrl.searchPost)

router.get('/:id/comment',isLoggedIn, postCtlr.getComment)
router.post('/:id/comment',isLoggedIn, postCtlr.createComment)
router.put('/:id/comment', isLoggedIn, isUsersComment,postCtlr.modifyComment)
router.delete('/:id/comment',isLoggedIn, isUsersComment,postCtlr.deleteComment)


router.post('/:id/like',isLoggedIn, postCtlr.like)
router.post('/comment/:id/like',isLoggedIn, postCtlr.commentLike)
module.exports = router