const express = require("express");
const Sequelize = require("./database");
const dotenv = require("dotenv").config();
const path = require("path");

const mongoConnect = require("./database").mongoConnect;

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");

const User = require("./models/user-table");
const Order = require("./models/payment-table");
const Expense = require("./models/expense-table");
const Forgotpass = require("./models/forgot-pass");
const ExpenseDownloadhistory = require("./models/expense-download-history.js");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const paymentRoutes = require("./routes/payment");
const { default: mongoose } = require("mongoose");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/payment", paymentRoutes);

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Forgotpass);
// Forgotpass.belongsTo(User);

// User.hasMany(ExpenseDownloadhistory);
// ExpenseDownloadhistory.belongsTo(User);

mongoose
  .connect(
    "mongodb+srv://shubhamsnimje:rkNC6Qk0QAYQLOA8@cluster0.trnlavl.mongodb.net/expenses?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected to mongoose");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

// console.log(dotenv.parsed.PORT)
// Sequelize.sync({force:true})
// Sequelize.sync()
//   .then((result) => {
//     // console.error(result);
//     // app.listen(dotenv.parsed.DB_HOST);
//     app.listen(4000);
//   })
//   .catch((err) => console.error(err));
// app.listen(3000);
