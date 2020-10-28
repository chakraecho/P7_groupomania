const {Sequelize} = require('sequelize');
const sequelize = require('./../db-config')

const userRole = sequelize.define('userRole', {
    roleId: { type: Sequelize.INTEGER, primaryKey: true, unique: true },
    description: { type: Sequelize.STRING, allowNull: false }
}
);




module.exports = userRole