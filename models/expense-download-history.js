const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expensedownloadhistorySchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "ExpenseDownloadhistory",
  expensedownloadhistorySchema
);

// const { Sequelize } = require("sequelize").Sequelize;
// const sequelize = require("../database");

// const ExpenseDownloadhistory = sequelize.define("expensedownloadhistory", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   url: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }
// });

// module.exports = ExpenseDownloadhistory;
