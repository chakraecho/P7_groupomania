const noctification = require('./../models/noctification')
const user = require('./../models/users')
const { Op } = require('sequelize')


exports.getAll = (req, res) => {
    const id = req.params.id
    noctification.findAll({
        where: {
            notified: {
                [Op.eq]: id,
            }
        },
        include: {
            model: user,
            as:'notified'
        }
    })
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(400).json({ error: 'error' + error.toString() }))
}