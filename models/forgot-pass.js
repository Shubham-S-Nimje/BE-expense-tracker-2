const { Sequelize } = require("sequelize").Sequelize;
const sequelize = require("../database");

const Forgotpass = sequelize.define("forgotpass", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
  expiresby: {
    type: Sequelize.DATE,
  },
});

module.exports = Forgotpass;
