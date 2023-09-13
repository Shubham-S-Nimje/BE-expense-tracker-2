const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentid: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

// const { Sequelize } = require("sequelize").Sequelize;
// const sequelize = require("../database");

// const Order = sequelize.define("order", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   paymentid: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   orderid: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   status: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Order;
