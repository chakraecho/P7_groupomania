const Sequelize = require('sequelize')
const sequelize = require('./../db-config')


const follow = sequelize.define('follow',{
    accepted:{type:Sequelize.STRING(10), allowNull:false}
})

exports.follow = follow