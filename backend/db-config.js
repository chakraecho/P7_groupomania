const Sequelize = require('sequelize')


const sequelize = new Sequelize(process.env.DB, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' <- SQL SERVER */
    define:{
        freezeTableName: true
      }
  });
  try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


  sequelize.sync({ alter: true }).then(  console.log("All models were synchronized successfully.")).catch('error synchronizing')
