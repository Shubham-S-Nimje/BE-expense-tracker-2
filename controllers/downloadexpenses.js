const Expense = require("../models/expense-table");
const uploadToS3 = require("../services/s3services");
const ExpenseDownloadhistory = require("../models/expense-download-history");

exports.downloadExpense = async (req, res, next) => {
  if (req.user.ispremiumuser) {
    try {
      const result = await Expense.findAll({
        where: {
          userid: req.user.id,
        },
      });

      if (result) {
        const stringifiedExpense = JSON.stringify(result);
        // console.log(req.user.id);

        const filename = `expenses${req.user.id}/${new Date()}.txt`;
        const fileUrl = await uploadToS3(stringifiedExpense, filename);
        // console.log(fileUrl);

        const downloadHistoryEntry = await ExpenseDownloadhistory.create({
          url: fileUrl,
          userId: req.user.id,
        });

        res.status(200).json({
          message: "Expense downloaded successfully",
          expense: result,
          fileUrl: fileUrl,
          downloadHistoryEntry: downloadHistoryEntry,
        });
      } else {
        res.status(401).json({ message: "Expense not found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error while downloading expense", err: err });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.fetchDownloadedExpenses = async (req, res, next) => {
  if (req.user.ispremiumuser) {
    try {
      const result = await ExpenseDownloadhistory.findAll({
        where: {
          userid: req.user.id,
        },
      });

      if (result) {
        const expenseshistory = JSON.stringify(result);
        console.log(expenseshistory);

        res.status(200).json({
          message: "Expense History downloaded successfully",
          fetchDownloadedExpenses: result,
        });
      } else {
        res.status(401).json({ message: "Expense History Not Found" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error while downloading expense history", err: err });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
