const path = require("path");
const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const forgotpassController = require("../controllers/forgotpass");
const authenticateUser = require("../middleware/auth");

router.post("/add-user", userController.addUser);
router.post("/login-user", userController.loginUser);
router.post("/forgotpassword", forgotpassController.forgotPassword);
router.get("/resetpassword/:requestId", forgotpassController.resetpassword);
router.post("/updatepassword/:resetId", forgotpassController.updatepassword);
router.use("/fetch-user", authenticateUser, userController.fetchUser);

module.exports = router;
