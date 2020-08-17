const Users = require('./../models/users');



exports.signup = (req,res,next)=>{
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
        
        
            Users.create({
                lastName: lastName,
                firstName: firstName,
                email: email,
                    password: password
            })
            .then(() => res.status(201).json({
                message: 'Utilisateur créé !'

              }))
            .catch(error => res.status(500).json({error}))
        
    

    
}