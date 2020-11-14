const dotenv = require("dotenv")
dotenv.config()

const sequelize = require('sequelize')
const prompt = require('prompt')
const bcrypt = require('bcrypt')
const userRole = require('./../models/role')
const {groupRole} = require('./../models/group')
const association = require('./../models/associations')


const init = async () => {
    await userRole.create({
        roleId: 1,
        description: "admin"
    })
        .catch(error => console.log(error))

    await userRole.create({
        roleId: 2,
        description: "user"
    })
        .catch(error => console.log(error))


    await groupRole.create(
        {
            groupRoleId: 1,
            roleName: 'admin'
        })
        .catch(error => console.log(error))
    await groupRole.create(
        {
            groupRoleId: 2,
            roleName: 'user'
        })
        .catch(error => console.log(error))
    await groupRole.create(
        {
            groupRoleId: 3,
            roleName: 'banned'
        })
        .catch(error => console.log(error))

    console.log('init ok')
}

setTimeout(()=> init(), 2000)
