const Users = require("../models/users-table");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Email And Password are required fields!" });
  }

  const salt = await bcrypt.genSalt(10);
  const secretpass = await bcrypt.hash(password, salt);

  Users.create({ username: username, email: email, password: secretpass })
    .then((userData) => {
      res.status(201).json({
        message: "Account created successfully!",
        data: userData,
      });
    })
    .catch((err) => {
      //   console.log(err.fields.username_UNIQUE);
      let errorin = "";
      if (err.fields.username_UNIQUE) {
        errorin = `Username "${err.fields.username_UNIQUE}"`;
        // console.log(err.fields.username_UNIQUE);
      } else if (err.fields.email_UNIQUE) {
        errorin = `Email "${err.fields.email_UNIQUE}"`;
        // console.log(err.fields.email_UNIQUE);
      }
      return res.status(400).json({ error: `${errorin} already exists` });
    });

  //   console.log(req.body);
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  //   bcrypt.compare(password, Users.password, function (err, result) {
  //     console.log(result);
  //   });
  Users.findAll({
    where: { email: email },
  })
    .then((user) => {
      bcrypt.compare(password, user[0].password, function (err, result) {
        // console.log(result);
        if (result) {
          // console.log(password)
          // console.log("User found:",user[0].password);
          res.status(200).json({ message: "Login successful", user: user });
        } else {
          console.log("User not found");
          res.status(401).json({ message: "User not found" });
        }
      });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).json({ message: "Error logging in" });
    });

  //   console.log(req.body);
};
