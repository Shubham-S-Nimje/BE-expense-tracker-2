const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expensemoney: {
    type: String,
    required: true,
  },
  expensedescription: {
    type: String,
    required: true,
  },
  expensecategory: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);

// const { Sequelize } = require("sequelize").Sequelize;
// const sequelize = require("../database");

// const Expense = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   // userid: {
//   //   type: Sequelize.STRING,
//   //   allowNull: false,
//   // },
//   expensemoney: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   expensedescription: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   expensecategory: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Expense;
