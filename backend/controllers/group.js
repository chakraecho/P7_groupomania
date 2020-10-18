const User = require('./../models/users')
const { Op } = require('sequelize')
const { groups, groupMembers } = require('./../models/group')

exports.getOwnGroups = (req, res) => {
    console.log(req.session)
    const id = req.session.userId
    groupMembers.findAll({
        where: {
            userId: id
        },
        include: [{ model: groups }]
    })
        .then(result => res.status(200).json({ result }))
        .catch(error => console.log(error))
}

exports.getOneGroup = (req, res) => {
    const userID = req.session.userId
    groups.findAll({
        where: { groupId: req.params.id }
    })
        .then(group => {
            res.status(200).json({ group })
        })
        .catch(error => console.log(error))
}

exports.createGroup = (req, res, next) => {
    const p_body = JSON.parse(req.body.body)
    const groupName = p_body.groupName
    const user = p_body.userId
    const description = p_body.description
    let body = new Object
    Object.assign(body, {
        groupName,
        description,
        userId: user,
    })

    if (req.files.length > 0) {
        for (let i in req.files) {
            console.log(req.files[i])
            if (req.files[i].fieldname === 'bannerImg') {
                Object.assign(body, {bannerUrl : `${req.protocol}://${req.get('host')}/uploads/${req.files[i].filename}`})
            }
            if (req.files[i].fieldname === 'profileImg') {
                Object.assign(body, {imgUrl : `${req.protocol}://${req.get('host')}/uploads/${req.files[i].filename}`})
            }
        }


    }
    groups.create(body).then(group => groupMembers.create({
        groupId: group.groupId,
        userId: user,
        isCreator: true,
        isAdmin: true
    }).then(groupMembers => {
        res.status(201).json({ message: 'groupe créé !', groupMembers, group })
    })
        .catch(error => res.status(500).json({ message: 'groupe non trouvé !', error }))
    )
        .catch(error => res.status(500).json({ error }))
}

exports.modifyGroup = (req, res) => {
    const groupName = req.body.groupName
    const description = req.body.description
    const groupId = req.params.id

    groups.update({ description, }, { where: { groupId } })
        .then(() => res.status(200).json({ message: 'groupe modifié !' }))
        .catch(() => res.status(500).json({ error }))
}

exports.modifyImg = (req, res) => {
    const groupId = req.params.id
    groups.update({ imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` }, { where: { groupId } })
        .then(() => res.status(200).json({ message: 'image de groupe modifié !' }))
        .catch((error) => res.status(500).json({ error }))
}

exports.modifyBanner = (req, res) => {
    const groupId = req.params.id
    groups.update({ bannerUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` }, { where: { groupId } })
        .then(() => res.status(200).json({ message: 'image de groupe modifié !' }))
        .catch((error) => res.status(500).json({ error }))
}

exports.deleteGroup = (req, res) => {
    const groupId = req.params.id
    groups.destroy({ where: { groupId } })
        .then(() => res.status(200).json({ message: 'groupe supprimé !' }))
}


exports.addMember = (req, res) => {
    const userId = req.body.userId
    const groupId = req.params.id

    groupMembers.create({ userId, groupId })
        .then(() => res.status(200).json({ message: 'vous avez rejoint le groupe !' }))
        .catch(error => res.status(500).json({ error }))
}

exports.deleteMember = (req, res) => {
    groupMembers.destroy({
        where: {
            [Op.and]: [{ groupId: req.params.id }, { userId: req.body.userId }]
        }
    })
        .then(() => res.status(200).json({ message: 'utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }))
}