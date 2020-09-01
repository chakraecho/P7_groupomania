const sequelize = require('./../db-config')
const Sequelize = require('sequelize')


const group = sequelize.define('group',{
    groupId:{type:Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    description:{type:Sequelize.TEXT, allowNull:false},
    imgUrl:{type:Sequelize.STRING },
    bannerUrl:{type:Sequelize.STRING}
})

const groupMembers = sequelize.define('groupMembers')



exports.groupMembers = groupMembers
exports.group = group