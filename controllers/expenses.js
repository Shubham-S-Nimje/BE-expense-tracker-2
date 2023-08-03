const { Sequelize } = require("sequelize");
const Expense = require("../models/expense-table");
const User = require("../models/user-table");
const sequelize = require("../database");

exports.addExpense = async (req, res, next) => {
  const { expensemoney, expensedescription, expensecategory } = await req.body;
  // console.log(req.body.userid)
  if (!expensemoney || !expensedescription || !expensecategory) {
    return res.status(400).json({
      error:
        "Expensemoney, Expensedescription and Expensecategory are required fields!",
    });
  }
  // console.log(req.user.id);
  const t = await sequelize.transaction();

  try {
    const addExpense = await Expense.create(
      {
        expensemoney: expensemoney,
        expensedescription: expensedescription,
        expensecategory: expensecategory,
        userId: req.user.id,
      },
      { transaction: t }
    );

    const userExpenses = await Expense.sum("expensemoney", {
      where: { userId: req.user.id },
      transaction: t,
    });
    //   console.log(userExpenses);

    const user = await User.findByPk(req.user.id, { transaction: t });
    //   console.log(user);
    user.totalExpensemoney = userExpenses;
    await user.save({ transaction: t });
    await t.commit();
    res.status(201).json({
      message: "Expense added successfully!",
      data: addExpense,
    });
  } catch (err) {
    //   console.log(err);
    await t.rollback();
    return res.status(400).json({ error: "Error while adding expense" });
  }
};

exports.fetchExpense = (req, res, next) => {
  const { userid } = req.body;
  // console.log(req.body);
  // console.log(req.user.id)
  Expense.findAll({
    where: {
      userid: req.user.id,
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

exports.deleteExpense = async (req, res, next) => {
  const expenseid = req.params.id;
  // console.log(expenseid);

  const t = await sequelize.transaction();
  try {
    await Expense.destroy({
      where: { id: expenseid },
      transaction: t,
    });

    const userExpenses = await Expense.sum("expensemoney", {
      where: { userId: req.user.id },
      transaction: t,
    });

    const user = await User.findByPk(req.user.id, { transaction: t });
    if (user) {
      user.totalExpensemoney = userExpenses;
      await user.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: "Expence deleted successfully" });
  } catch (err) {
    await t.rollback();
    console.log("Error:", err);
    res.status(400).json({ message: "Error while deleting expence" });
  }
};

exports.fetchTotalexpense = async (req, res, next) => {
  try {
    const totalExpenses = await Expense.findAll({
      attributes: [
        "userId",
        [
          Sequelize.fn(
            "SUM",
            Sequelize.cast(Sequelize.col("expensemoney"), "INTEGER")
          ),
          "totalExpensemoney",
        ],
      ],
      group: ["userId"],
      include: [{ model: User, attributes: ["id", "username"] }],
    });

    const formattedData = totalExpenses.map((expense) => ({
      userId: expense.user.id,
      username: expense.user.username,
      totalExpensemoney: expense.getDataValue("totalExpensemoney"),
    }));
    // console.log(formattedData);

    res.status(200).json(formattedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching total expenses" });
  }
};
