const Sequelize = require('sequelize')
console.log(process.env)
const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' <- SQL SERVER */
  define: {
    freezeTableName: true
  },
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  timezone: '+02:00',
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


sequelize.sync({alter:true}).then(() => {
  console.log("All models were synchronized successfully.")

}).catch('error synchronizing')

module.exports = sequelize