const Users = require('./../models/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')
const session = require('express-session')

exports.signup = (req, res, next) => {
  console.log(req.body)
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
        password: hash
      })
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(500).json({ error }))
    })
}

exports.login = (req, res, next)=>{
  const email = req.body.email
  const password = req.body.password
  Users.findOne({
    where:{
      email:{
        [Op.eq]:email
      }
    }
  })
  .then(user =>{
    if(!user){
      return res.status(404).json({message:'utilisateur introuvable !'})
    }
    else if(user){
      bcrypt.compare(password, user.password)
      .then(result =>{
        if(!result ){
          return res.status(401).json({message:'mot de passe incorrect !'})
        }
        else if(result){
          req.session.email = req.body.email
          return res.status(200).cookie('aBigSecret', jwt.sign(
            {userId : user.email},
            process.env.JWT_KEY,
            {expiresIn:'24h'}
          ),{httpOnly:true, secure:false}).json({message:'connecté !'})
        }
      })
      .catch(error => res.status(500).json({ error }));
    }
  })
}

exports.changeImg = (req,res,next)=>{
  const token = req.cookies.aBigSecret
  const decoded = jwt.compare(token, process.env.JWT_KEY)
  req.file ? (
    User.update({imgUrl:`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`},{where: {email : decoded} })
    .then(()=>{
      res.status(200).json({message:'photo de profil modifié !'})
    })
    .catch(error => res.status(500).json({message:'erreur serveur, veuillez contacter un administrateur si le problème persiste.'}))
  ):(
    res.status(400).json({message:'image non upload !'})
  )
}

exports.changeBanner = (req, res)=>{
  const token = req.cookies.aBigSecret
  const decoded = jwt.compare(token, process.env.JWT_KEY)
  req.file ? (
    User.update({bannerUrl:`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`},{where: {email : decoded} })
    .then(()=>{
      res.status(200).json({message:'image de bannière modifié !'})
    })
    .catch(error => res.status(500).json({message:'erreur serveur, veuillez contacter un administrateur si le problème persiste.'}))
  ):(
    res.status(400).json({message:'image non upload !'})
  )
}