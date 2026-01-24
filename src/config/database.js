const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user");
const dbConfig = require("./db.config");

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
);

const User = UserModel(sequelize, DataTypes);

module.exports = { sequelize,User};
