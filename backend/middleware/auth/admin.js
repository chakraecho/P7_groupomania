const user = require('./../../models/users')

exports.isAdminUser = (req, res, next)=>{
    user.findOne({
        where : {
            userId : req.session.userId
        }
    })
    .then(result => {
        if(result.toleId.toString() === "1"){
            next()
        }else {
            return res.status(401).json({message: "action non autorisée"})
        }
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({message : "erreur interne : utilisateur non trouvé !"})
    })
}