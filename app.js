const express = require("express");
const Sequelize = require("./database");

const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./controllers/users");
const expenseController = require("./controllers/expenses");
const paymentController = require("./controllers/payment");

const User = require("./models/user-table");
const Order = require("./models/payment-table");
const Expense = require("./models/expense-table");
const authenticateUser = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/add-user", userController.addUser);

app.use("/login-user", userController.loginUser);

app.use("/fetch-user", authenticateUser, userController.fetchUser);

app.use("/activate-premium", authenticateUser, paymentController.premiumUser);

app.use("/add-expences", authenticateUser, expenseController.addExpense);

app.use(
  "/delete-expences/:id",
  authenticateUser,
  expenseController.deleteExpense
);

app.use("/fetch-expences", authenticateUser, expenseController.fetchExpense);

app.use("/fetch-totalexpencesbyuser", authenticateUser, expenseController.fetchTotalexpense);

app.use("/payment-success", authenticateUser, paymentController.paymentSuccess);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// Sequelize.sync({force:true})
Sequelize.sync()
  .then((result) => {
    // console.error(result);
    app.listen(4000);
  })
  .catch((err) => console.error(err));
// app.listen(3000);
