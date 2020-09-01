const sequelize = require('./../db-config')
const Sequelize = require('sequelize')


const noctification = sequelize.define('noctification',{
        type:{type:Sequelize.STRING(30),allowNull:false},
        postId:{type:Sequelize.STRING(255)},
        seen:{type:Sequelize.BOOLEAN, allowNull:false}
})


module.exports = noctification