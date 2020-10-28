const Sequelize = require('sequelize');
const sequelize = require('./../db-config')

const admin = sequelize.define('admin',{
    type:{type:Sequelize.STRING(30), allowNull : false},
    idType : {type:Sequelize.INTEGER, allowNull: false},
    message:{type:Sequelize.TEXT, allowNull : false},
    seen :{type: Sequelize.BOOLEAN, defaultValue:false}
})

exports.admin = admin