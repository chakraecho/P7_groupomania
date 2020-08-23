const Users = require('./../models/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')

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
  console.log(req.body)
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
          return res.status(200).json({
            token:jwt.sign(
              {userId : user.email},
              process.env.JWT_KEY,
              {expiresIn:'24h'}
            )
          })
        }
      })
      .catch(error => res.status(500).json({ error }));
    }
  })
}