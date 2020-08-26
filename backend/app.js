const express = require('express')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()

const app = express()


//DB connect
const Sequelize = require('sequelize')
const dbConfig = require('./db-config')

//cookies session modules
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

//routes files
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')

//cookies session
var myStore = new SequelizeStore({
  db: dbConfig,
});
app.use(
  session({
    secret: "a key that is ultra secret and should not be given to others",
    store: myStore,
    resave: false,
    rolling:true
  })
);
 
myStore.sync();



//middlewares
app.use(helmet())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyparser.json())



//routes
app.use('/api/users/auth', userRoutes )
app.use('/api/post', postRoutes)


module.exports = app