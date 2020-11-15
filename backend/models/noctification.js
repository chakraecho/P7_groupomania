const sequelize = require('./../db-config')
const Sequelize = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')


const noctification = sequelize.define('noctification',{
        type:{type:Sequelize.STRING(30),allowNull:false},
        seen:{type:Sequelize.BOOLEAN, allowNull:false, defaultValue : false}
})

sequelizePaginate.paginate(noctification)


module.exports = noctification