const sequelize = require('./../db-config')
const Sequelize = require('sequelize')

const department = sequelize.define('department',{
    name:{type:Sequelize.STRING(100), allowNull:false},
    departmentId:{type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order:{type:Sequelize.SMALLINT.UNSIGNED, allowNull: false}
}
)



exports.department = department