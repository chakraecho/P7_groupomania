const {groups} = require('./../models/group')
const {Op} = require('sequelize')

exports.findGroup = (req, res) => {
    const query = '%' + req.query.group + '%'
    console.log(query)
    groups.findAll({
        where: {
                groupName: {[Op.like]: query}
            }
    })
        .then(result => res.status(200).json({result}))
        .catch(error => {
            console.log(error)
            res.status(400).json({error})
        })
}