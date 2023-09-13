const User = require("../models/user-table");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sequelize = require("../database");

const JWT_SECRET = "expense@app";

exports.addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Email And Password are required fields!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: `Email already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const secretpass = await bcrypt.hash(password, salt);

    const createuser = await User({
      username: username,
      email: email,
      password: secretpass,
      ispremiumuser: false,
      totalExpensemoney: "0",
    });

    await createuser.save();

    const data = {
      user: {
        id: createuser.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtdata)

    res.status(201).json({
      message: "Account created successfully!",
      data: { authToken },
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Error while creating account!",
    });
  }
  //   console.log(req.body);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    // console.log(checkUser);
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, function (err, result) {
        // console.log(result);
        if (result) {
          const data = {
            user: {
              id: checkUser.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          res
            .status(200)
            .json({ message: "Login successful", user: { authToken } });
        } else {
          // console.log("User not found");
          res.status(401).json({ message: "Invalid Password" });
        }
      });
    }
  } catch (err) {
    // console.log("Error:", err);
    res.status(400).json({ message: "Error while log in" });
  }
  //   console.log(req.body);
};

exports.fetchUser = async (req, res, next) => {
  try {
    if (req.user) {
      res
        .status(201)
        .json({ message: "User fetched successfully", user: req.user });
    }
  } catch (err) {
    // console.log("Error:", err);
    res.status(400).json({ message: "Error while fetching user", error: err });
  }
};
