const { Sequelize } = require("sequelize").Sequelize;

const sequelize = new Sequelize("expense-tracker", "root", "2112", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
