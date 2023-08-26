const { Model, DataTypes}= require('sequelize');
const sequelize = require('../database.js');
const User = require('./User.js');
class Chatbot extends Model {}



Chatbot.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true // Assuming the description is optional
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'chatbot'
});

// Define relationships
Chatbot.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Chatbot, { foreignKey: 'userId', as: 'chatbots' });

module.exports=Chatbot;