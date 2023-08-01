const { Sequelize } = require("sequelize").Sequelize;
const sequelize = require("../database");

const Expenses = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userid: { 
    type: Sequelize.STRING,
    allowNull: false,
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
