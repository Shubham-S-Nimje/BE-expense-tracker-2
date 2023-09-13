const path = require("path");
const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenses");
const downloadexpenseController = require("../controllers/downloadexpenses");
const authenticateUser = require("../middleware/auth");

router.post("/add-expense", authenticateUser, expenseController.addExpense);
router.post(
  "/download-expenses",
  authenticateUser,
  downloadexpenseController.downloadExpense
);
router.use(
  "/delete-expense/:id",
  authenticateUser,
  expenseController.deleteExpense
);
router.use("/fetch-expenses", authenticateUser, expenseController.fetchExpense);
router.use(
  "/fetch-downloadedexpensesdata",
  authenticateUser,
  downloadexpenseController.fetchDownloadedExpenses
);
router.use(
  "/fetch-totalexpensesbyuser",
  authenticateUser,
  expenseController.fetchTotalexpense
);

module.exports = router;
