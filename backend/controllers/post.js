const Post = require('./../models/post')
const User = require('./../models/users')
const jwt = require('jsonwebtoken')

exports.createOne = (req, res, next) => {
    console.log(req.body)
    Post.Post.create({ content: req.body.content, like: 0, dislike: 0, userId: req.body.userId })
        .then(() => res.status(201).json({ message: 'post créé !' }))
        .catch(error => res.status(500).json({ error }))
}

exports.getOne = (req, res, next) => {
    Post.Post.findOne({ where: { postId: req.body.postId } })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }))
}

exports.getAll = (req, res, next) => {
    console.log('ROUTE ENTRE POUR LA GET ALL')
    Post.Post.findAll({ limit: 10, order: '"updatedAt" DESC' })
        .then(posts => {
            console.log(posts)
            return res.status(200).json({ posts })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.modifyOne = (req, res, next) => {
    const token = req.session.aBigSecret
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const postId = req.params.id
    const id = req.session.email
    const content = req.body.content
    Post.Post.findOne({ where: { postId: postId }, include: [{ model: User }] })
        .then(post => {
            if (id && decoded !== post.email) {
                return res.status(401).json({ message: 'action non autorisé !' })
            }
            else if (id && decoded !== post.email) {
                req.file ? (
                    Post.Post.update({
                        content,
                        imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
                    }, {where:{email : email}}))
                    .then(()=>{
                        const filename = post.imgUrl.split('/uploads/')[1];
                        fs.unlink(`/uploads/${filename}`)
                    })
                    .then(() => res.status(200).json({ message: 'post modifié !' }))
                    .catch(error => res.status(400).json({ error })) : (
                        Post.Post.update({
                            content
                        })
                        .then(() => res.status(200).json({ message: 'post modifié !' }))
                        .catch(error => res.status(400).json({ error }))
                    )
            }
        })
}

exports.deleteOne = (req, res) => {
    const postId = req.params.id
    Post.Post.destroy({ where: { postId: postId } })
        .then(() => res.status(200).json({ message: 'post supprimé !' }))
        .catch((error) => res.status(500).json({ error }))
}