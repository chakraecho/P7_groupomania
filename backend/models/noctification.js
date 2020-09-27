const sequelize = require('./../db-config')
const Sequelize = require('sequelize')


const noctification = sequelize.define('noctification',{
        type:{type:Sequelize.STRING(30),allowNull:false},
        seen:{type:Sequelize.BOOLEAN, allowNull:false},
        groupId:{type: Sequelize.SMALLINT}
})


module.exports = noctification