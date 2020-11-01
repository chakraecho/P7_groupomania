const express= require('express')
const router = express.Router()
const multer = require('./../middleware/multer-config')
const {limit400} = require('./../middleware/express-limit')


const postCtlr = require('./../controllers/post')
const searchCtrl = require('./../controllers/search')

const {isLoggedIn} = require('./../middleware/auth/user')
const {isUsersPost, isUsersComment} = require('./../middleware/auth/post')


router.get('/', limit400, isLoggedIn, postCtlr.getAll)
router.post('/submit', limit400, isLoggedIn,multer,  postCtlr.createOne)
router.put('/:id', limit400, isLoggedIn, isUsersPost, multer, postCtlr.modifyOne)
router.delete('/:id', limit400, isLoggedIn, isUsersPost, postCtlr.deleteOne)

router.get('/search',limit400, isLoggedIn, searchCtrl.searchPost)

router.get('/:id/comment',limit400, isLoggedIn, postCtlr.getComment)
router.post('/:id/comment',limit400, isLoggedIn, postCtlr.createComment)
router.put('/:id/comment', limit400, isLoggedIn, isUsersComment,postCtlr.modifyComment)
router.delete('/:id/comment',limit400, isLoggedIn, isUsersComment,postCtlr.deleteComment)


router.post('/:id/like',limit400, isLoggedIn, postCtlr.like)
router.post('/comment/:id/like',limit400, isLoggedIn, postCtlr.commentLike)
module.exports = router