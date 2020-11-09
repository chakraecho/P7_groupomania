const sequelize = require('./../db-config')
const Sequelize = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')


const groups = sequelize.define('groups', {
    groupId: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    description: { type: Sequelize.TEXT, allowNull: false },
    imgUrl: { type: Sequelize.STRING, defaultValue: process.env.BASE_URL +'/assets/group.svg' },
    bannerUrl: { type: Sequelize.STRING, defaultValue: process.env.BASE_URL +'/assets/default_banner.jpg' },
    groupName: { type: Sequelize.STRING, allowNull: false }
})

const groupMembers = sequelize.define('groupMembers')

const groupRole = sequelize.define('groupRole', {
    groupRoleId: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true },
    roleName: { type: Sequelize.STRING(20) }
}, { timestamps: false })

sequelizePaginate.paginate(groups)

exports.groupRole = groupRole
exports.groupMembers = groupMembers
exports.groups = groups