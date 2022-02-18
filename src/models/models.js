const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const UserAccount = sequelize.define('user_account', {
    accountId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
});

const User = sequelize.define('user', {
    userId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    secondName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false}
});

const Message = sequelize.define('message', {
    messageId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    messageName: {type: DataTypes.STRING, unique: true, allowNull: true,},
    messageText: {type: DataTypes.STRING, allowNull: true}
});

const Email = sequelize.define('email', {
    emailId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: true, unique: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    secondName: {type: DataTypes.STRING, allowNull: true},
    lastName: {type: DataTypes.STRING, allowNull: true}
});

User.hasOne(UserAccount);
UserAccount.belongsTo(User);

module.exports = {
    UserAccount,
    User,
    Message,
    Email
};
