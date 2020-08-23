import {Post, userLiked} from './../models/post'

exports.getAll = (req, res, next) => {
    Post.create({ content:req.body.content, like:0, dislike:0, userId: req.body.userId })
    .then(()=> res.status(201).json({message:'post créé !'}))
    .catch(error => res.status(500).json({error}))
}

exports.getOne = (req,res,next)=>{
    Post.findOne({ where: { postId: req.body.postId } })
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(404).json({error}))
}

exports.modifyOne = (req,res,next)=>{
    
}

exports.deleteOne = (req, res, next)=>{
    Post.destroy({where: {postId : req.body.postId}})
    .then(()=> res.status(200).json({message:'post supprimé !'}))
    .catch((error)=> res.status(500).json({error}))
}