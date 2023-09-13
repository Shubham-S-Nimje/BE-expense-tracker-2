const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumuser: {
    type: Boolean,
    required: true,
  },
  totalExpensemoney: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
// const { Sequelize } = require("sequelize").Sequelize;
// const sequelize = require("../database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   ispremiumuser: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   totalExpensemoney: {
//     type: Sequelize.STRING,
//   },
// });

// module.exports = User;
