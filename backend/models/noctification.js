import Sequelize from 'sequelize'
import User from './users'


const noctification = Sequelize.define('noctification',{
        type:{type:Sequelize.STRING(30),allowNull:false},
        postId:{type:Sequelize.STRING(255)},
        seen:{type:Sequelize.BOOLEAN, allowNull:false}
})
noctification.belongsTo(User, {foreignKey: 'from'})
noctification.belongsTo(User, {foreignKey: 'to'})

exports.noctification = noctifications