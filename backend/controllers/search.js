const { groups } = require('./../models/group')
const { Op } = require('sequelize')
const User = require('./../models/users')
const {Post, userLiked} = require('./../models/post')
const sequelizePaginate = require('sequelize-paginate')
const fs = require('fs')


var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

exports.findGroup = (req, res) => {
    const query = '%' + req.query.group + '%'
    const current_page = req.query.page ? req.query.page : 1
    const route = "/api/group/search?"

    groups.paginate({
        page: req.query.page, paginate: 10,
        where: {
            groupName: { [Op.like]: query }
        }
    })
        .then(result => {
            const prev = current_page === 1 ? process.env.BASE_URL + route + 'page=1&group=' + req.query.group : process.env.BASE_URL + route + 'page=' + (current_page - 1) + "&group=" + req.query.group
            const next = current_page === 1 ? process.env.BASE_URL + route + 'page=1&group=' + req.query.group : process.env.BASE_URL + route + 'page=' + (current_page + 1) + "&group=" + req.query.group
            const links = {
                prev,
                next,
                first: process.env.BASE_URL + route + 'page=1&group=' + req.query.group,
                last: process.env.BASE_URL + route + 'page=' + result.pages + "&group=" + req.query.group
            }
            res.status(200).json({ result, links, current_page })
        })
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
        })
}

exports.searchUser = (req, res)=>{
    const query = '%' + req.query.users + '%'
    const current_page = req.query.page ? req.query.page : 1
    const route = '/api/users/search?'

    User.paginate({
        page: req.query.page, paginate: 10,
        where: {
            [Op.or]: [{
                firstName: { [Op.like]: query }
            },{
                lastName: { [Op.like]: query }
            }]
        }
    })
        .then(result => {
            const prev = current_page === 1 ? process.env.BASE_URL + route + 'page=1&users=' + req.query.group : process.env.BASE_URL + route + 'page=' + (current_page - 1) + "&users=" + req.query.group
            const next = current_page === 1 ? process.env.BASE_URL + route + 'page=1&users=' + req.query.group : process.env.BASE_URL + route + 'page=' + (current_page + 1) + "&users=" + req.query.group
            const links = {
                prev,
                next,
                first: process.env.BASE_URL + route + 'page=1&users=' + req.query.group,
                last: process.env.BASE_URL + route + 'page=' + result.pages + "&users=" + req.query.group
            }
            res.status(200).json({ result, links, current_page })
        })
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
        })
}

exports.searchPost = (req,res) => {
    const query = '%' + req.query.post + '%'
    const current_page = req.query.page ? req.query.page : 1
    const route = '/api/users/search?'
    Post.paginate({
        page: req.query.page, paginate: 10,
        where: {
            content : { [Op.like]: query }
        },
        include: [{
            model: User,
            attributes: ['lastName', 'firstName', 'profilImgUrl']
        }, {
            model: userLiked,
            where: {
                userId: {
                    [Op.eq]: req.session.userId
                }
            },
            attributes: ['type'],
            required: false
        }
        ]
    })
        .then(result => {
            const prev = current_page === 1 ? process.env.BASE_URL + route + 'page=1&group=' + req.query.group : process.env.BASE_URL + route + 'page=' + (current_page - 1) + "&group=" + req.query.group
            const next = current_page === 1 ? process.env.BASE_URL + route + 'page=1&group=' + req.query.group : process.env.BASE_URL + route + 'page=' + (current_page + 1) + "&group=" + req.query.group
            const links = {
                prev,
                next,
                first: process.env.BASE_URL + route + 'page=1&group=' + req.query.group,
                last: process.env.BASE_URL + route + 'page=' + result.pages + "&group=" + req.query.group
            }
            res.status(200).json({ result, links, current_page })
        })
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
        })
}