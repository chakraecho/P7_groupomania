import Sequelize from'sequelize'

const department = Sequelize.define('department',{
    name:{type:Sequelize.STRING(100), allowNull:false},
    departmentId:{type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order:{type:Sequelize.SMALLINT.UNSIGNED, allowNull: false}
}
)

department.belongsTo(User)

exports.department = Department