const Follow = require('./../models/follow')
const { Op } = require('sequelize')

exports.checkFollow = (req, res)=>{
    const follower = req.session.userId
    const followed = req.params.id
    if(req.session.userId !== follower){
        res.status(401).json({message:"vérification non autorisé !"})
    }
    else{
        Follow.findOne({where:{[Op.and]:[{follower: follower},{followed: followed}]}})
        .then(result => {
            if (result === null){
                res.status(204).json({result: "non suivi"})
            }
            else{
                res.status(200).json({result: "suivi"})
            }
        })
        .catch(error => console.log(error) )
    }
}

exports.followOne = (req,res)=>{
    const follower = req.session.userId
    const followed = req.params.id
    if(follower === followed){
        res.status(401).json({message:'non autorisé'})
    }
    else{
        Follow.create({follower, followed})
        .then(()=> res.status(200).json({message:'utilisateur suivi !'}))
        .catch(error => res.status(500).json({error}))
    }
}


exports.deleteFollow = (req,res)=>{
    const follower = req.session.userId
    const followed = req.params.id
    if(follower == undefined || followed == undefined){
        return res.status(400).json({message:'mauvais corps de requete'})
    }
    Follow.destroy({
        where:{
            [Op.and]:[{follower},{followed}]
        }
    })
    .then(()=> res.status(200).json({message:'vous ne le suivez plus !'}))
    .catch(error => res.status(400).json({error}))
}