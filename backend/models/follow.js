import Sequelize from 'sequelize'

const follow = Sequelize.define('follow',{
    from:{type:Sequelize.STRING(255), allowNull:false},
    to:{type:Sequelize.STRING(255), allowNull:false}
})

exports.follow = follow