const {admin} = require('./../models/admin')
const sequelizePagination = require("sequelize-paginate")

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
        .then(()=> res.status(201).json({message : "succès"}))
        .catch(error => res.status(500).json({error}))
}

exports.getAll = (req, res) => {
    const current_page = req.query.page ? req.query.page : 1
    admin.paginate({page: req.query.page, paginate : 15})
        .then(alerts => {
            const prev = current_page === 1 ? process.env.BASE_URL + '/api/admin/list?page=1' : process.env.BASE_URL + '/api/list?page=' + (current_page-1)
            const next = current_page === 1 ? process.env.BASE_URL + '/api/admin/list?page=1' : process.env.BASE_URL + '/api/list?page=' + (current_page+1)
            const links = {
                prev,
                next,
                first: process.env.BASE_URL +'/api/admin/list?page=1',
                last : process.env.BASE_URL + '/api/admin/list?page=' + alerts.pages
            }
            res.status(200).json({...alerts, current_page, links})
        })
        .catch(error => res.status(500).json({error}))

}

exports.delete = (req,res) => {
    admin.destroy({where : {id : req.body.id}})
        .then(()=> res.status(200))
        .catch(error => res.status(500))
}

exports.deleteContent = (req, res) => {

}