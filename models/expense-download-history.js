const { Sequelize } = require("sequelize").Sequelize;
const sequelize = require("../database");

const ExpenseDownloadhistory = sequelize.define("expensedownloadhistory", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  url: { 
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = ExpenseDownloadhistory;
