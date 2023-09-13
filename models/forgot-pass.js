const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forgotpassSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
  expiresby: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Forgotpass", forgotpassSchema);

// const { Sequelize } = require("sequelize").Sequelize;
// const sequelize = require("../database");

// const Forgotpass = sequelize.define("forgotpass", {
//   id: {
//     type: Sequelize.UUID,
//     primaryKey: true,
//     allowNull: false,
//   },
//   active: {
//     type: Sequelize.BOOLEAN,
//   },
//   expiresby: {
//     type: Sequelize.DATE,
//   },
// });

// module.exports = Forgotpass;
