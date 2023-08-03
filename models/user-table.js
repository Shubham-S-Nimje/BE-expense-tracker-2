const { Sequelize } = require("sequelize").Sequelize;
const sequelize = require("../database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ispremiumuser: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
  totalExpensemoney: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
