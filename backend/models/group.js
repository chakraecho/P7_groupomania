const sequelize = require('./../db-config')
const Sequelize = require('sequelize')


const groups = sequelize.define('groups',{
    groupId:{type:Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    description:{type:Sequelize.TEXT, allowNull:false},
    imgUrl:{type:Sequelize.STRING, default:'http://localhost:3000/assets/group.svg'},
    bannerUrl:{type:Sequelize.STRING, default:'http://localhost:3000/assets/default_banner.svg'},
    groupName:{type:Sequelize.STRING, allowNull:false},
    onInvit:{type:Sequelize.BOOLEAN, allowNull:false, default: false}
})

const groupMembers = sequelize.define('groupMembers',{
    isCreator:{type:Sequelize.BOOLEAN},
    
})



exports.groupMembers = groupMembers
exports.groups = groups