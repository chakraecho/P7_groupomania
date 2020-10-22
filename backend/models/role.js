const Sequelize = require('sequelize');
const sequelize = require('./../db-config')

const userRole = sequelize.define('userRole', {
    roleId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true },
    description: { type: Sequelize.STRING(20), allowNull: false }
}
);

userRole.create({
    roleId: 1,
    description: "admin"
})
userRole.create({
    roleId: 2,
    description: "user"
})

module.exports = userRole