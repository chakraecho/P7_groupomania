const noctification = require('./../models/noctification')
const {Op} = require('sequelize')

exports.getAll = (req,res)=>{
    const id = req.body.from
    noctification.findAll({
        where:{
            [Op.or]:[{from : id},{to: id}]
        }
    })
    .then(result => res.status(200).json({result}))
    .catch(error => res.status(400).json({error}))
}