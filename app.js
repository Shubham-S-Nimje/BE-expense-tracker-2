const express = require("express");
const Sequelize = require("./database");

const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require('./controllers/users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/add-user", userController.addUser);

Sequelize.sync()
  .then((result) => {
    // console.error(result);
    app.listen(4000);
  })
  .catch((err) => console.error(err));
// app.listen(3000);
