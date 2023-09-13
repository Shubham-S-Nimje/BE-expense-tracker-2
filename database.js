// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(
//     "mongodb+srv://shubhamsnimje:rkNC6Qk0QAYQLOA8@cluster0.trnlavl.mongodb.net/expenses?retryWrites=true&w=majority"
//   )
//     .then((client) => {
//       console.log("connected");
//       _db = client.db();
//       callback();
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found";
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;

// const dotenv = require("dotenv").config();
// const { Sequelize } = require("sequelize").Sequelize;

// const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST } = dotenv.parsed;

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   dialect: "mysql",
//   host: DB_HOST,
// });

// module.exports = sequelize;
