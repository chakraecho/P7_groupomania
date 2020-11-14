const dotenv = require("dotenv")
dotenv.config()

const sequelize = require('sequelize')
const prompt = require('prompt')
const bcrypt = require('bcrypt')
const User = require("./../models/users")
const association = require('./../models/associations')

const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


const properties = [
    {
        name: 'nom',
        validator: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        warning: 'Nom au mauvais format'
    },
    {
        name: 'prenom',
        validator: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        warning: 'Prénom au mauvais format'

    },
    {
        name: 'email',
        validator: emailRegex,
        warning: "Email au mauvais format"
    },
    {
        name : "Mot de passe",
        validator: passwordRegex,
        warning: "Le mot de passe doit contenir au moins 8 caractères dont 1 lettre majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial. "
    }
];

setTimeout(()=>{
    prompt.start();

    prompt.get(properties, function (err, result) {
        if (err) { return onErr(err); }



        bcrypt.hash(result['Mot de passe'], 10 )
            .then((hash)=>{
                User.create({
                    roleId: 1,
                    lastName: result.nom,
                    firstName: result.prenom,
                    email : result.email,
                    password : hash,

                }).then(()=> console.log('Utilisateur initialisé !'))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))


    });

    function onErr(err) {
        console.log(err);
        return 1;
    }
}, 1500)

