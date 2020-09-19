const Sequelize = require('sequelize')
const sequelize = require('./../db-config')


const follow = sequelize.define('follow')

module.exports = follow