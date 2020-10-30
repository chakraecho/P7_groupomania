const {admin} = require('./../models/admin')

exports.createAlert = (req, res) => {
    const userId = req.session.userId
    const typeId = req.params.id
    const types = ['post', 'comment']
    if(!types.includes(req.body.type)){
        return res.status(400).json({message : "format incorrect"})
    }
    admin.create({
        type : req.body.type,
        typeId,
        message : req.body.message,
        userId
    })
        .then(()=> res.status(201))
        .catch(error => res.status(500).json({error}))
}

exports.getAll = (req, res) => {
    admin.findAll()
        .then(alerts => res.status(200).json({alerts}))
        .catch(error => res.status(500).json({error}))
}

exports.delete = (req,res) => {
    admin.destroy({where : {id : req.body.id}})
        .then(()=> res.status(200))
        .catch(error => res.status(500))
}

exports.deleteContent = (req, res) => {

}