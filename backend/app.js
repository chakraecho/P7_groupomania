const express = require('express')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
dotenv.config()

const Sequelize = require('sequelize')
const dbConfig = require('./db-config.js')



const app = express()

app.use(helmet())
app.use(bodyparser)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });




module.exports = app