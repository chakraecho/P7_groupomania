const { groups } = require('./../models/group')
const { Op } = require('sequelize')
const User = require('./../models/users')
const sequelizePaginate = require('sequelize-paginate')

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
            console.log(error)
            res.status(400).json({ error })
        })
}