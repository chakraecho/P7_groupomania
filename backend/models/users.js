const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../db-config')
const bcrypt = require('bcrypt')

/*
 * USER
 */
const User = sequelize.define('User', {
    userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    lastName: { type: Sequelize.STRING(50), allowNull: false, },
    firstName: { type: Sequelize.STRING(70), allowNull: false },
    profilImgUrl: { type: Sequelize.STRING(255), defaultValue: `http://localhost:3000/assets/person.svg` },
    description: { type: Sequelize.TEXT },
    email: { type: Sequelize.STRING(70), allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: Sequelize.STRING(255), allowNull: false },
    role: { type: Sequelize.STRING(40) },
    bannerUrl: { type: Sequelize.STRING(255), defaultValue: `http://localhost:3000/assets/default_banner.jpg` }
}
);

bcrypt.hash(process.env.ADMIN_PASSWORD, 10, )
.then((hash)=>{
    User.create({
        lastName: process.env.ADMIN_LASTNAME,
        firstName: process.env.ADMIN_FIRSTNAME,
        email : process.env.ADMIN_EMAIL,
        password : hash,
        roleId: 0
    })
})


module.exports = User

