import Sequelize from'sequelize'

const department = Sequelize.define('department',{
    name:{type:Sequelize.STRING(100), allowNull:false},
    departmentId:{type: Sequelize.SMALLINT.UNSIGNED, autoIncrement: true, primaryKey: true }
}
)

department.belongsTo(User)

exports.department = Department