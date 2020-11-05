const noctification = require('./../models/noctification')
const user = require('./../models/users')
const {groups} = require('./../models/group')
const { Op } = require('sequelize')

exports.getAll = (req, res) => {
    const id = req.params.id
    const current_page = req.query.page ? req.query.page : 1

    noctification.paginate({
        page: req.query.page,
        paginate : 10,
        where: {
            notified_id: {
                [Op.eq]: id,
            }
        },
        include: [{
            model: user,
            as : 'creator',
            attributes: [
                'userId',
                'lastName',
                'firstName',
                'profilImgUrl',
            ]
        },{
            model: groups,
            attributes:[
                'groupId',
                'groupName'
            ]
        }
    ]
    })
        .then(result => {
            const prev = current_page === 1 ? process.env.BASE_URL + '/api/users/notification/'+ req.params.id +'?page=1' : process.env.BASE_URL + '/api/users/notification/' + req.params.id +'?page=' + (current_page-1)
            const next = current_page === result.pages.toString() ? process.env.BASE_URL + '/api/users/notification/'+ req.params.id +'?page='+result.pages : process.env.BASE_URL + '/api/users/notification/' + req.params.id +'?page=' + (current_page+1)
            const links = {
                prev,
                next,
                first: process.env.BASE_URL +'/api/post?page=1',
                last : process.env.BASE_URL + '/api/post?page=' + result.pages
            }
            res.status(200).json({ ...result, result: result.docs, links, current_page })
        })
        .catch(error => res.status(400).json({ error: 'error' + error.toString() }))
}

exports.deleteOne = (req, res) => {
    noctification.destroy({
        where : {
            notified_id: req.session.userId,
            id : req.params.id
        }
    }).then(()=> res.status(200).json({ message :"notification supprimé !"}))
    .catch(error => {
        console.log(error)
        res.status(500).json({message :"erreur lors de la requete !"})
    })
}

exports.deleteAll = (req, res) => {
    noctification.destroy({
        where :{
            notified_id : req.session.userId
        }
    }).then(()=> res.status(200).json({ message :"notifications supprimés !"}))
    .catch(error => {
        console.log(error)
        res.status(500).json({message :"erreur lors de la requete !"})
    })
}