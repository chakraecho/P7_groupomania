const { Post, Comments, commentLiked } = require('./../../models/post')
const { Op } = require('sequelize')

exports.isUsersPost = (req, res, next) => {
    try {
        Post.findOne({ where: { postId: req.params.id } })
            .then(result => {
                if (result.userId.toString()=== req.session.userId){
                    next()
                }
                else {
                    res.status(401).json({message : "action non autorisée !"})
                }
        })
            .catch(error => {
                console.log(error)
                res.status(404).json({ message: "erreur serveur, veuillez rééssayer" })
            })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "erreur interne serveur" })
    }
}

exports.isUsersComment = (req, res, next) => {
    try {
        Comments.findOne({ where: { postId: req.params.id } })
            .then(result => {
                if (result.userId.toString()=== req.session.userId){
                    next()
                }
                else {
                    res.status(401).json({message : "action non autorisée !"})
                }
        })
            .catch(error => {
                console.log(error)
                res.status(404).json({ message: "erreur serveur, veuillez rééssayer" })
            })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "erreur interne serveur" })
    }
}

exports.isUsersLike = (req, res, next) => {
    try {
        commentLiked.findOne({ where: { postId: req.params.id } })
            .then(result => {
                if (result.userId.toString()=== req.session.userId){
                    next()
                }
                else {
                    res.status(401).json({message : "action non autorisée !"})
                }
        })
            .catch(error => {
                console.log(error)
                res.status(404).json({ message: "erreur serveur, veuillez rééssayer" })
            })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "erreur interne serveur" })
    }
}