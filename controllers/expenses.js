const { Sequelize } = require("sequelize");
const Expense = require("../models/expense-table");
const User = require("../models/user-table");
const sequelize = require("../database");

exports.addExpense = async (req, res, next) => {
  const { expensemoney, expensedescription, expensecategory } = await req.body;
  // console.log(req.body);
  // console.log(req.user.id);

  if (!expensemoney || !expensedescription || !expensecategory) {
    return res.status(400).json({
      error:
        "Expensemoney, Expensedescription and Expensecategory are required fields!",
    });
  }

  try {
    const addExpense = await Expense({
      expensemoney: expensemoney,
      expensedescription: expensedescription,
      expensecategory: expensecategory,
      userId: req.user.id,
    });

    await addExpense.save();
    // console.log(addExpense);

    const userExpenses = await Expense.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalExpensemoney: {
            $sum: {
              $toDouble: "$expensemoney",
            },
          },
        },
      },
    ]);
    console.log(userExpenses);

    if (userExpenses.length > 0) {
      const totalExpensemoney = userExpenses[0].totalExpensemoney;
      console.log(totalExpensemoney);

      await User.findByIdAndUpdate(req.user.id, {
        totalExpensemoney: `${totalExpensemoney}`,
      });
    }

    res.status(201).json({
      message: "Expense added successfully!",
      data: addExpense,
      totalExpensemoney:
        userExpenses.length > 0 ? userExpenses[0].totalExpensemoney : 0,
    });
  } catch (err) {
    //   console.log(err);
    return res.status(400).json({ error: "Error while adding expense" });
  }
};

exports.fetchExpense = (req, res, next) => {
  const userid = req.user._id;
  // console.log(req.body);
  // console.log(req.user);
  // console.log(userid);
  Expense.find({ userId: userid })
    .then((result) => {
      // console.log(result);
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
      // console.log("Error:", err);
      res.status(400).json({ message: "Error while fetching expence" });
    });
};

exports.deleteExpense = async (req, res, next) => {
  const expenseid = req.params.id;
  // console.log(expenseid);

  try {
    await Expense.findByIdAndRemove(expenseid);

    const userExpenses = await Expense.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: null, totalExpensemoney: { $sum: "$expensemoney" } } },
    ]);

    if (userExpenses.length > 0) {
      const totalExpensemoney = userExpenses[0].totalExpensemoney;
      // console.log(totalExpensemoney);

      await User.findByIdAndUpdate(req.user._id, { totalExpensemoney });
      res.status(201).json({
        message: "Expence deleted successfully",
        totalExpensemoney: totalExpensemoney,
      });
    }
    res.status(201).json({
      message: "Expence deleted successfully",
      totalExpensemoney: "0",
    });
  } catch (err) {
    // console.log("Error:", err);
    res.status(400).json({ message: "Error while deleting expence" });
  }
};

exports.fetchTotalexpense = async (req, res, next) => {
  try {
    const users = await User.find(
      {},
      "ispremiumuser username totalExpensemoney"
    );
    // console.log(users);

    if (!users) {
      console.log("No users found.");
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching total expenses" });
  }
};
