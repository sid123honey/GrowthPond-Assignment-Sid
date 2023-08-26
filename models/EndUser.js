const { Model, DataTypes}= require('sequelize');
const sequelize = require('../database.js');

class EndUser extends Model {}

EndUser.init({
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { sequelize, modelName: 'endUser' });  // Note the modelName is camelCased

module.exports = EndUser;
