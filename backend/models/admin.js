const Sequelize = require('sequelize');
const sequelize = require('./../db-config')
const sequelizePaginate = require('sequelize-paginate')

const admin = sequelize.define('admin',{
    type:{type:Sequelize.STRING(30), allowNull : false},
    typeId : {type:Sequelize.INTEGER, allowNull: false},
    message:{type:Sequelize.TEXT, allowNull : false},
    seen :{type: Sequelize.BOOLEAN, defaultValue:false}
})

sequelizePaginate.paginate(admin)

exports.admin = admin