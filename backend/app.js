const express = require('express')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path');
const toobusy = require('toobusy-js')

dotenv.config()

const app = express()


//DB connect
const Sequelize = require('sequelize')
const dbConfig = require('./db-config')

const association = require('./models/associations')

//cookies session modules
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

//cookies
var myStore = new SequelizeStore({
  db: dbConfig,
});
app.use(
  session({
    secret: "a key that is ultra secret and should not be given to others",
    store: myStore,
    resave: false,
    rolling:true,
    saveUninitialized: false,
    maxAge: 1000* 60 * 60 *24 * 365,
    cookie:{
      expires: 1000*60*60*24*7
    }
  })
);
 
myStore.sync();


//routes files
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const groupRoutes = require('./routes/group')
const adminRoutes = require('./routes/admin')

//overcharge server check
app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, "Serveur surchargé, veuillez rééssayer plus tard");
  } else {
    next();
  }
});

app.use((req) => {
    console.log("request incomming")
})

//middlewares
app.use(helmet())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
  });


app.use(bodyparser.json())
app.use(cookieParser())
//serve static files
app.use('/assets', express.static(path.join(__dirname, '\\assets')));
app.use('/uploads', express.static(path.join(__dirname, '\\uploads')));
//routes
app.use('/api/users', userRoutes )
app.use('/api/post', postRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app