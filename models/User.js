const { Model, DataTypes}= require('sequelize');
const sequelize = require('../database.js');
class User extends Model {}

User.init({
    name:
    {
       type: DataTypes.STRING
    } ,

    email: 
    {
        type: DataTypes.STRING
    },
    password:
    {
        type:DataTypes.STRING
    }  // for authentication (hashed)
}, { sequelize, modelName: 'user' });

module.exports = User;