const express = require("express");
const Sequelize = require("./database");
const dotenv = require("dotenv").config();
const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require('fs')

const userController = require("./controllers/users");
const expenseController = require("./controllers/expenses");
const paymentController = require("./controllers/payment");
const forgotpassController = require("./controllers/forgotpass");
const downloadexpenseController = require("./controllers/downloadexpenses");

const User = require("./models/user-table");
const Order = require("./models/payment-table");
const Expense = require("./models/expense-table");
const Forgotpass = require("./models/forgot-pass");
const ExpenseDownloadhistory = require("./models/expense-download-history.js");

const authenticateUser = require("./middleware/auth");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(compression());
// app.use(morgan("combined"), { stream: accessLogStream });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/add-user", userController.addUser);

app.use("/login-user", userController.loginUser);

app.use("/fetch-user", authenticateUser, userController.fetchUser);

app.use("/activate-premium", authenticateUser, paymentController.premiumUser);

app.use("/add-expences", authenticateUser, expenseController.addExpense);

app.use(
  "/user/download-expenses",
  authenticateUser,
  downloadexpenseController.downloadExpense
);

app.use("/forgotpassword", forgotpassController.forgotPassword);

app.get("/resetpassword/:requestId", forgotpassController.resetpassword);

app.post("/updatepassword/:resetId", forgotpassController.updatepassword);

app.use(
  "/delete-expences/:id",
  authenticateUser,
  expenseController.deleteExpense
);

app.use("/fetch-expences", authenticateUser, expenseController.fetchExpense);

app.use(
  "/fetch-downloadedexpensedata",
  authenticateUser,
  downloadexpenseController.fetchDownloadedExpenses
);

app.use(
  "/fetch-totalexpencesbyuser",
  authenticateUser,
  expenseController.fetchTotalexpense
);

app.use("/payment-success", authenticateUser, paymentController.paymentSuccess);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpass);
Forgotpass.belongsTo(User);

User.hasMany(ExpenseDownloadhistory);
ExpenseDownloadhistory.belongsTo(User);

// console.log(dotenv.parsed.PORT)
// Sequelize.sync({force:true})
Sequelize.sync()
  .then((result) => {
    // console.error(result);
    // app.listen(dotenv.parsed.PORT || 4000);
    app.listen(4000);
  })
  .catch((err) => console.error(err));
// app.listen(3000);
