const Expenses = require("../models/expenses-table");

exports.addExpense = async (req, res, next) => {
  const { expensemoney, expensedescription, expensecategory, userid } =
    req.body;
  if (!expensemoney || !expensedescription || !expensecategory || !userid) {
    return res.status(400).json({
      error:
        "Expensemoney, Expensedescription and Expensecategory are required fields!",
    });
  }

  Expenses.create({
    expensemoney: expensemoney,
    expensedescription: expensedescription,
    expensecategory: expensecategory,
    userid: userid,
  })
    .then((ExpenseData) => {
      res.status(201).json({
        message: "Expense added successfully!",
        data: ExpenseData,
      });
    })
    .catch((err) => {
      //   console.log(err);
      return res.status(400).json({ error: "Error while adding expense" });
    });

  // console.log(req.body);
};

exports.fetchExpense = (req, res, next) => {
  const { userlocalId } = req.body;
  // console.log(req.body);
  Expenses.findAll({
    where: {
      userid: userlocalId,
    },
  })
    .then((result) => {
      // console.log(result)
      if (result) {
        res
          .status(200)
          .json({ message: "Expence fetched successfully", expense: result });
      } else {
        // console.log("Expence not found");
        res.status(401).json({ message: "Expence not found" });
      }
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).json({ message: "Error while fetching expence" });
    });
};

exports.deleteExpense = (req, res, next) => {
  const expenseid = req.params.id;
  console.log(expenseid);
  Expenses.destroy({
    where: { id: expenseid },
  })
    .then((result) => {
      res.status(201).json({ message: "Expence deleted successfully" });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).json({ message: "Error while deleting expence" });
    });
};
