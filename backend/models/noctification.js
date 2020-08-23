import Sequelize from 'sequelize'

const noctification = Sequelize.define('noctification',{
        type:{type:Sequelize.STRING(30),allowNull:false},
        from:{type:Sequelize.STRING(255)},
        to:{type:Sequelize.STRING(255)},
        postId:{type:Sequelize.STRING(255)},
        seen:{type:Sequelize.BOOLEAN, allowNull:false}
})

exports.noctification = noctifications