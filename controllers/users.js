const User = require("../models/user-table");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "expense@app";
exports.addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Email And Password are required fields!" });
  }

  const salt = await bcrypt.genSalt(10);
  const secretpass = await bcrypt.hash(password, salt);

  User.create({ username: username, email: email, password: secretpass, ispremiumuser: false })
    .then((userData) => {
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtdata)
      res.status(201).json({
        message: "Account created successfully!",
        data: { authToken },
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
  User.findAll({
    where: { email: email },
  })
    .then((user) => {
      bcrypt.compare(password, user[0].password, function (err, result) {
        // console.log(result);
        if (result) {
          // console.log(user[0].id)
          // console.log("User found:",user[0].password);
          const data = {
            user: {
              id: user[0].id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          res
            .status(200)
            .json({ message: "Login successful", user: { authToken } });
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
