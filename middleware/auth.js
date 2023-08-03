const jwt = require("jsonwebtoken");
const User = require("../models/user-table");
const JWT_SECRET = "expense@app";

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // console.log(decoded.user.id)
    User.findByPk(decoded.user.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // console.log(JSON.stringify(user))
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).json({ message: "Error while fetching user" });
      });
  });
};

module.exports = authenticateUser;
