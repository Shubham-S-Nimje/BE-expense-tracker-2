const path = require("path");
const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");
const authenticateUser = require("../middleware/auth");

router.use(
  "/payment-success",
  authenticateUser,
  paymentController.paymentSuccess
);
router.use(
  "/activate-premium",
  authenticateUser,
  paymentController.premiumUser
);

module.exports = router;
