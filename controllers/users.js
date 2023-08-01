const Users = require("../models/users-table");

exports.addUser = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Email And Password are required fields!" });
  }

  Users.create({ username: username, email: email, password: password })
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
