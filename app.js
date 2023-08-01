const express = require("express");
const Sequelize = require("./database");

const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./controllers/users");
const expenseController = require("./controllers/expenses");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/add-user", userController.addUser);

app.use("/login-user", userController.loginUser);

app.use("/add-expences", expenseController.addExpense);

app.use("/delete-expences/:id", expenseController.deleteExpense);

app.use("/fetch-expences", expenseController.fetchExpense);

Sequelize.sync()
  .then((result) => {
    // console.error(result);
    app.listen(4000);
  })
  .catch((err) => console.error(err));
// app.listen(3000);
