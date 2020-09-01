const sequelize = require('./../db-config')
const Sequelize = require('sequelize')


const groups = sequelize.define('groups',{
    groupId:{type:Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    description:{type:Sequelize.TEXT, allowNull:false},
    imgUrl:{type:Sequelize.STRING },
    bannerUrl:{type:Sequelize.STRING}
})

const groupMembers = sequelize.define('groupMembers')



exports.groupMembers = groupMembers
exports.groups = groups