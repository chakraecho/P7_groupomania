const Follow = require('./../models/follow')
const { Op } = require('sequelize')

exports.checkFollow = (req, res)=>{
    const from = req.body.from
    const to = req.body.to
    console.log(from, to)
    if(req.session.userId !== from){
        res.status(401).json({message:"vérification non autorisé !"})
    }
    else{
        Follow.findOne({where:{[Op.and]:[{from: from},{to: to}]}})
        .then(result => {
            console.log(result)
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
    const from = req.body.from
    const to = req.body.to
    if(to === from){
        res.status(401).json({message:'non autorisé'})
    }
    else{
        Follow.create({from, to})
        .then(()=> res.status(200).json({message:'utilisateur suivi !'}))
        .catch(error => res.status(500).json({error}))
    }
}


exports.deleteFollow = (req,res)=>{
    const from = req.body.from
    const to = req.body.to
    if(from == undefined || to == undefined){
        return res.status(400).json({message:'mauvais corps de requete'})
    }
    Follow.destroy({
        where:{
            [Op.and]:[{from},{to}]
        }
    })
    .then(()=> res.status(200).json({message:'vous ne le suivez plus !'}))
    .catch(error => res.status(400).json({error}))
}