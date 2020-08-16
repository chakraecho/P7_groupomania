const Sequelize = require("sequelize");

const Account = sequelize.define('Account', {
    accountId: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING(70), allowNull: false, unique: 'compositeIndex' },
    password: {type: Sequelize.STRING(255), allowNull:false}
});
Account.belongsTo(User)
exports.Account = Account;

/*
 * USER
 */
const User = sequelize.define('User', {
    userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    lastName: { type: Sequelize.STRING(50), allowNull: false, },
    firstName: { type: Sequelize.STRING(70), allowNull: false },
    imgUrl:{type:Sequelize.STRING(255)},
    description:{type:Sequelize.TEXT}
}
);
exports.User = User;

