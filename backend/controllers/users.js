const Users = require('./../models/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')
const session = require('express-session');
const User = require('./../models/users');
const fs = require('fs')

const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

var logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})


exports.signup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;

    if (!nameRegex.test(lastName) || !nameRegex.test(firstName)) {
        return res.status(400).json({message: "C'est quoi ce nom..."})
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({message: 'Le champs email est au mauvais format !'})
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({message: 'mot de passe au mauvais format !'})
    }

    bcrypt.hash(password, 10)
        .then(hash => {
            Users.create({
                lastName: lastName,
                firstName: firstName,
                email: email,
                password: hash,
                roleId: 2
            })
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => {
                    logger.write(error)
                    res.status(500).json({message: "Erreur lors de la création de l'utilisateur, veuillez rééssayer."})
                })
        })
        .catch(error => {
            logger.write(error)
            res.status(500).json({message: "Erreur interne, veuillez contacter un administrateur."})
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    Users.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'utilisateur introuvable !'})
            } else if (user) {
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (!result) {
                            return res.status(401).json({message: 'mot de passe incorrect !'})
                        } else if (result) {
                            req.session.email = user.email
                            req.session.userId = user.userId
                            const isAdmin = user.roleId === 1 ? true : false

                            return res.status(200).cookie('aBigSecret', jwt.sign(
                                {userId: user.userId, email: user.email}, process.env.JWT_KEY, {expiresIn: '24h'}),
                                {
                                    httpOnly: true,
                                    secure: process.env.MODE === 'production' ? true : false,
                                    sameSite: "none"
                                }
                            ).json({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                profilImgUrl: user.profilImgUrl,
                                bannerUrl: user.bannerUrl,
                                userId: user.userId,
                                isAdmin
                            })
                        }
                    })
                    .catch(error => res.status(500).json({error}));
            }
        })
}

exports.getUser = (req, res) => {
    const id = req.params.id
    Users.findOne({
        where: {userId: {[Op.eq]: id}},
        attributes: ['userId', 'firstName', "lastName", "profilImgUrl", "bannerUrl", "description"]
    })
        .then(user => res.status(200).json({user}))
        .catch(error => {
            logger.write(error)
            res.redirect("/notfound").json({message: "vous vous êtes perdu"})
        })
}

exports.verify = (req, res, next) => {
    console.log(req.session.email)
    if (req.session.email) {
        const email = req.session.email
        Users.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).json({message: 'utilisateur introuvable !'})
                } else if (user) {
                    req.session.email = user.email
                    req.session.userId = user.userId
                    const isAdmin = user.roleId === 1 ? true : false
                    return res.status(200).cookie('aBigSecret', jwt.sign(
                        {
                            userId: user.userId,
                            email: user.email
                        },
                        process.env.JWT_KEY,
                        {expiresIn: '24h'}
                    ), {
                        httpOnly: true,
                        secure: process.env.MODE === 'production' ? true : false,
                        sameSite: "none"
                    }).json({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profilImgUrl: user.profilImgUrl,
                        bannerUrl: user.bannerUrl,
                        userId: user.userId,
                        isAdmin
                    })

                }
            })
    } else if (!req.session.email) {
        return res.status(401).json({message: 'non authentifié !'})
    }
}

exports.changeImg = (req, res, next) => {
    req.files[0] ? (
        User.findOne({
            where: {
                userId: req.session.userId
            }
        })
            .then(result => {
                if (result.profilImgUrl !== `${req.protocol}://${req.get('host')}/assets/person.svg`){
                    const old = result.profilImgUrl.split('/uploads/')[1]
                    fs.unlink('/uploads/' + old)
                }
            })
            .then(() => {
                User.update({profilImgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`}, {where: {userId: req.session.userId}})
                    .then(() => {
                        User.findOne({
                            where: {userId: req.session.userId},
                            attributes: ['bannerUrl', "lastName", "firstName", "description", "profilImgUrl"]
                        })
                            .then(user => res.status(200).json({user, message: "Image bien modifié !"}))
                            .catch(error => {
                                logger.write(error)
                                res.status(500).json({message: "Erreur lors de la mise à jour des infos."})
                            })
                    })
                    .catch(error => {
                        logger.write(error)
                        res.status(500).json({message: 'erreur serveur, veuillez contacter un administrateur si le problème persiste.'})
                    })
            })


    ) : (
        res.status(400).json({message: 'image non upload !'})
    )
}

exports.changeBanner = (req, res) => {
    req.files[0] ? (
            User.findOne({
                where: {
                    userId: req.session.userId
                }
            })
                .then(result => {
                    if (result.bannerUrl !== `${req.protocol}://${req.get('host')}/assets/default_banner.svg`){
                        const old = result.profilImgUrl.split('/uploads/')[1]
                        fs.unlink('/uploads/' + old)
                    }
                })
                .then(()=>{
                    User.update({bannerUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`}, {where: {userId: req.session.userId}})
                        .then(() => {
                            User.findOne({
                                where: {userId: req.session.userId},
                                attributes: ['bannerUrl', "lastName", "firstName", "description", "profilImgUrl"]
                            })
                                .then(user => res.status(200).json({user, message: "Image bien modifé !"}))
                                .catch(error => {
                                    logger.write(error)

                                    res.status(500).json({message: "Une erreur s'est produite lors de la mise à jour de la bannière."})
                                })
                        })
                        .catch(error => {
                            logger.write(error)
                            res.status(500).json({message: 'erreur serveur, veuillez contacter un administrateur si le problème persiste.'})
                        })
                })
    ) : (
        res.status(400).json({message: 'image non upload !'})
    )
}

exports.modify = (req, res) => {
    const body = req.body

    User.update({...body}, {where: {userId: req.session.userId}})
        .then(() => {
            User.findOne({
                where: {userId: req.session.userId},
                attributes: ['bannerUrl', "lastName", "firstName", "description", "profilImgUrl"]
            })
                .then(user => res.status(200).json({user, message: "Information bien modifé !"}))
                .catch(error => {
                    logger.write(error)
                    res.status(500).json({message: "Erreur lors de la récupération des données utilisateurs."})
                })
        })
        .catch(error => res.status(500).json({error}))
}

exports.disconnect = (req, res) => {
    req.session.destroy(
        function (err) {
            res.status(500).json({err})
        }
    )
    res.cookie('aBigSecret', {expires: Date.now()}
        , {
            httpOnly: true,
            secure: process.env.MODE === 'production' ? true : false
        }).status(200).json({message: "byebye !"})
}

exports.delete = (req, res) => {
    User.destroy({where: {userId: req.session.userId}})
        .then(() => res.status(200).json({message: "compte supprimé !"}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({message: "Erreur lors de la suppréssion de l'utilisateur, veuillez contacter un administrateur."})
        })
}
