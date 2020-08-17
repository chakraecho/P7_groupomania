const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../db-config')



/*
 * USER
 */
const User = sequelize.define('User', {
    userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    lastName: { type: Sequelize.STRING(50), allowNull: false, },
    firstName: { type: Sequelize.STRING(70), allowNull: false },
    imgUrl:{type:Sequelize.STRING(255)},
    description:{type:Sequelize.TEXT},
    email: { type: Sequelize.STRING(70), allowNull: false, unique: true, validate:{isEmail: true} },
    password: {type: Sequelize.STRING(255), allowNull:false}
}
);


module.exports = User

