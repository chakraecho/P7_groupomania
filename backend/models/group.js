const sequelize = require('./../db-config')
const Sequelize = require('sequelize')


const groups = sequelize.define('groups', {
    groupId: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    description: { type: Sequelize.TEXT, allowNull: false },
    imgUrl: { type: Sequelize.STRING, defaultValue: 'http://localhost:3000/assets/group.svg' },
    bannerUrl: { type: Sequelize.STRING, defaultValue: 'http://localhost:3000/assets/default_banner.jpg' },
    groupName: { type: Sequelize.STRING, allowNull: false }
})

const groupMembers = sequelize.define('groupMembers')

const groupRole = sequelize.define('groupRole', {
    groupRoleId: { type: Sequelize.INTEGER.UNSIGNED, primaryKey: true },
    roleName: { type: Sequelize.STRING(20) }
}, { timestamps: false })

groupRole.create({
    groupRoleId: 1,
    roleName: 'creator'
},
{
    groupRoleId: 2,
    roleName: 'admin'
},
{
    groupRoleId: 3,
    roleName: 'user'
})
groupRole.create(
{
    groupRoleId: 2,
    roleName: 'admin'
})
groupRole.create(
{
    groupRoleId: 3,
    roleName: 'user'
})

exports.groupRole = groupRole
exports.groupMembers = groupMembers
exports.groups = groups