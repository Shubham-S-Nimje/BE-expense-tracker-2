const { Sequelize } = require("sequelize").Sequelize;
const sequelize = require("../database");

const Expenses = sequelize.define("expenses", {
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  expensemoney: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expensedescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expensecategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expenses;
