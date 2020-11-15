const {groupMembers} = require('./../../models/group')
const {Op} = require('sequelize')

exports.isAdmin = (req, res, next)=>{
    groupMembers.findOne({
        where : {
            [Op.and] : [{
                groupId : req.params.id
            }, {
                userId : req.session.userId
            }]
        }
    })
    .then(result =>{
        if(result.role.toString() === "1"){
            next()
        }else {
            return res.status(401).json({message : "action non autorisée !"})
        }
    })
    .catch(error =>{
        console.log(error)
        return res.status(500).json({message : "utilisateur dans le group non trouvé "})
    })
}