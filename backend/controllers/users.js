const Users = require('./../models/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const session = require('express-session');
const User = require('./../models/users');
const fs = require('fs')


var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})


exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  bcrypt.hash(password, 10)
    .then(hash => {
      Users.create({
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: hash,
        roleId : 2
      })
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => {
          logger.write(error)
          res.status(500).json({ message : "Erreur lors de la création de l'utilisateur, veuillez rééssayer." })})
    })
    .catch(error =>{
      logger.write(error)
       res.status(500).json({ message :"Erreur interne, veuillez contacter un administrateur." })})
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
        return res.status(404).json({ message: 'utilisateur introuvable !' })
      }
      else if (user) {
        bcrypt.compare(password, user.password)
          .then(result => {
            if (!result) {
              return res.status(401).json({ message: 'mot de passe incorrect !' })
            }
            else if (result) {
              const account = user.dataValues
              req.session.email = email
              req.session.userId = account.userId
                const isAdmin = account.roleId === 1 ? true : false

              return res.status(200).cookie('aBigSecret', jwt.sign(
                { userId: account.userId ,
                  email : account.email
                },
                process.env.JWT_KEY,
                { expiresIn: '24h' }
              ), { httpOnly: true, secure: false }).json({
                firstName: account.firstName,
                lastName: account.lastName,
                profilImgUrl: account.profilImgUrl,
                bannerUrl: account.bannerUrl,
                userId: account.userId,
                isAdmin
              })
            }
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
}

exports.getUser = (req, res) => {
  const id = req.params.id
  Users.findOne({
    where: { userId: { [Op.eq]: id } },
    attributes : ['userId', 'firstName', "lastName", "profilImgUrl", "bannerUrl", "description"]
  })
    .then(user => res.status(200).json({ user }))
    .catch(error =>{
      logger.write(error)
       res.redirect("/notfound").json({message : "vous vous êtes perdu"})})
}

exports.verify = (req, res, next) => {
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
          return res.status(404).json({ message: 'utilisateur introuvable !' })
        }
        else if (user) {
          const account = user.dataValues
          req.session.userId = account.userId
          const isAdmin = account.roleId === 1 ? true : false
          return res.status(200).cookie('aBigSecret', jwt.sign(
            { userId: account.userId,
              email : account.email
             },
            process.env.JWT_KEY,
            { expiresIn: '24h' }
          ), { httpOnly: true, secure: false }).json({
            firstName: account.firstName,
            lastName: account.lastName,
            profilImgUrl: account.profilImgUrl,
            bannerUrl: account.bannerUrl,
            userId: account.userId,
            isAdmin
          })

        }
      })
  }
  else if (!req.session.email) {
    return res.status(401).json({ message: 'non authentifié !' })
  }
}

exports.changeImg = (req, res, next) => {
  req.files[0] ? (
    User.update({ profilImgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}` }, { where: { userId: req.session.userId } })
      .then(() => {
        User.findOne({ where: { userId: req.session.userId }, attributes: ['bannerUrl', "lastName", "firstName", "description", "profilImgUrl"] })
          .then(user => res.status(200).json({ user , message : "Image bien modifié !"}))
          .catch(error =>{
            logger.write(error)
             res.status(500).json({ message: "Erreur lors de la mise à jour des infos." })})
      })
      .catch(error => {
        logger.write(error)
        res.status(500).json({ message: 'erreur serveur, veuillez contacter un administrateur si le problème persiste.' })})
  ) : (
      res.status(400).json({ message: 'image non upload !' })
    )
}

exports.changeBanner = (req, res) => {
  req.files[0] ? (
    User.update({ bannerUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}` }, { where: { userId: req.session.userId } })
      .then(() => {
        User.findOne({ where: { userId: req.session.userId }, attributes: ['bannerUrl', "lastName", "firstName", "description", "profilImgUrl"] })
          .then(user => res.status(200).json({ user, message : "Image bien modifé !" }))
          .catch(error => {
            logger.write(error)

            res.status(500).json({ message : "Une erreur s'est produite lors de la mise à jour de la bannière." })})
      })
      .catch(error =>{
        logger.write(error)
        res.status(500).json({ message: 'erreur serveur, veuillez contacter un administrateur si le problème persiste.' })})
  ) : (
      res.status(400).json({ message: 'image non upload !' })
    )
}

exports.modify = (req, res) => {
  const body = req.body
  User.update({ ...body }, { where: { userId: req.session.userId } })
    .then(() => {
      User.findOne({ where: { userId: req.session.userId }, attributes: ['bannerUrl', "lastName", "firstName", "description", "profilImgUrl"] })
        .then(user => res.status(200).json({ user , message : "Information bien modifé !"}))
        .catch(error =>{
          logger.write(error)
          res.status(500).json({ message : "Erreur lors de la récupération des données utilisateurs." })})
    })
    .catch(error => res.status(500).json({ error }))
}

exports.disconnect = (req, res) => {
  req.session.destroy(
    function (err) {
      res.status(500).json({ err })
    }
  )
  res.cookie('aBigSecret', { expires: Date.now() }
    , { httpOnly: true, secure: false }).status(200)
}

exports.delete = (req, res) =>{
  User.destroy({where:{userId: req.session.userId}})
  .then(() => res.status(200).json({message : "compte supprimé !"}))
  .catch(error => {
    logger.write(error)
    res.status(500).json({message : "Erreur lors de la suppréssion de l'utilisateur, veuillez contacter un administrateur."})
  })
}
