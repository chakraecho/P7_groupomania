const noctification = require('./../models/noctification')
const user = require('./../models/users')
const {groups} = require('./../models/group')
const { Op } = require('sequelize')

exports.getAll = (req, res) => {
    const id = req.params.id
    noctification.findAll({
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
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(400).json({ error: 'error' + error.toString() }))
}