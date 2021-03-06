const User = require('./../models/users')
const fs = require('fs')
const {Op} = require('sequelize')
const {groups, groupMembers} = require('./../models/group')

exports.getOwnGroups = (req, res) => {
    console.log(req.session)
    const id = req.session.userId
    groupMembers.findAll({
        where: {
            userId: id
        },
        include: [{model: groups}]
    })
        .then(result => res.status(200).json({result}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
        })
}

exports.getOneGroup = (req, res) => {
    console.log(req.session)
    const userId = req.session.userId
    groups.findAll({
        where: {groupId: req.params.id}
    })
        .then(group => {
            try{
                groupMembers.findOne({where: {userId: req.session.userId, groupId: req.params.id}})
                .then(role => res.status(200).json({group, role: role.role}))
                .catch(error => {
                    res.status(200).json({group})
                    console.log(error)
                })
            }catch(e){
                console.log(e)
                res.status(200).json({group})
            }
            

        })
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
        })
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

    if (req.files && req.files.length === 1) {
        for (let i in req.files) {
            console.log(req.files[i])
            if (req.files[i].fieldname === 'bannerImg') {
                Object.assign(body, {bannerUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[i].filename}`})
            }
            if (req.files[i].fieldname === 'profileImg') {
                Object.assign(body, {imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[i].filename}`})
            }
        }
    }
    groups.create(body).then(group => groupMembers.create({
            groupId: group.groupId,
            userId: user,
            isCreator: true,
            role: 1
        }).then(groupMembers => {
            res.status(201).json({message: 'groupe créé !', groupMembers, group})
        })
            .catch(error => {
                logger.write(error)
                res.status(500).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
            })
    )
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur interne." })
        })
}

exports.modifyGroup = (req, res) => {
    const groupName = req.body.groupName
    const description = req.body.description
    const groupId = req.params.id

    groups.update({description}, {where: {groupId}})
        .then(() => groups.findOne({where: {groupId}})
            .then(group => res.status(200).json({group}))
            .catch(error => {
                logger.write(error)
                res.status(404).json({ message : "Groupe non trouvé." })
            }))
        .catch(() => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la modification des données, veuillez rééssayer." })
        })
}

exports.modifyImg = (req, res) => {

    const groupId = req.params.id
    if(req.files && req.files.length === 1){
        groups.findOne({
            where : {groupId}
        })
            .then(result => {
                if(result.imgUrl !== `${req.protocol}://${req.get('host')}/assets/group.svg`){
                    const old = result.imgUrl.split('/uploads/')[1]
                    fs.unlink('/uploads/' + old)
                }
            })
            .then(()=>{
                groups.findOne({where: { groupId}})
                    .then(group => {
                        groups.update({imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`}, {where: {groupId}})
                            .then(() => groups.findOne({where: {groupId}})
                                .then(group => res.status(200).json({group}))
                                .catch(error => {
                                    logger.write(error)
                                    res.status(404).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
                                }))
                            .catch((error) => {
                                logger.write(error)
                                res.status(500).json({ message : "Erreur lors de la modification des données, veuillez rééssayer." })
                            })
                    })
                    .catch(error => {
                        logger.write(error)
                        res.status(404).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
                    })
            })
            .catch(()=> res.status(500).json({message : "Erreur lors de la mise à jour."}))

    }else {
        res.status(400).json({message : "il manque une image !"})
    }


}

exports.modifyBanner = (req, res) => {
    const groupId = req.params.id
    console.log(req)
    groups.findOne({where: {groupId}})
        .then(result => {
            if(result.bannerUrl !== `${req.protocol}://${req.get('host')}/assets/default_banner.jpg`){
                const old = result.bannerUrl.split('/uploads/')[1]
                fs.unlink("/uploads/" + old )
            }

            groups.update({bannerUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`}, {where: {groupId}})
                .then(() => groups.findOne({where: {groupId}})
                    .then(group => res.status(200).json({group}))
                    .catch(error => {
                        logger.write(error)
                        res.status(404).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
                    }))
                .catch((error) => {
                    logger.write(error)
                    res.status(500).json({ message : "Erreur lors de la modification des données, veuillez rééssayer." })
                })
        })
        .catch(error => {
            logger.write(error)
            res.status(404).json({ message : "Erreur lors de la récupération des données, veuillez rééssayer." })
        })

}

exports.deleteGroup = (req, res) => {
    const groupId = req.params.id
    groups.destroy({where: {groupId}})
        .then(() => res.status(200).json({message: 'groupe supprimé !'}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la suppression des données, veuillez rééssayer." })
        })
}


exports.addMember = (req, res) => {
    const userId = req.session.userId
    const groupId = req.params.id

    groupMembers.create({userId, groupId, role: 2})
        .then(() => res.status(200).json({message: 'vous avez rejoint le groupe !'}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de l'ajout au groupe', veuillez rééssayer." })
        })
}

exports.deleteMember = (req, res) => {
    groupMembers.destroy({
        where: {
            [Op.and]: [{groupId: req.params.id}, {userId: req.body.userId}]
        }
    })
        .then(() => res.status(200).json({message: 'utilisateur supprimé !'}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({ message : "Erreur lors de la suppression des données, veuillez rééssayer." })
        })
}

exports.leave = (req, res) => {
    groupMembers.destroy({
        where :{
            [Op.and] : [{userId : req.session.userId}, {groupId : req.params.id}]
        }
    }).then(()=> res.status(200).json({message : "vous avez quitté le groupe !"}))
    .catch(error => {
        logger.write(error)
        res.status(404).json({ message : "Erreur lors de la suppression des données, veuillez rééssayer." })
    })
}
