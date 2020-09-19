const Follow = require('./../models/follow')

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
    Follow.destroy({
        where:{
            [Op.and]:[{from},{to}]
        }
    })
}