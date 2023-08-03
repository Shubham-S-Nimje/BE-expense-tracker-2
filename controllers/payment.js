const dotenv = require("dotenv").config();
const User = require("../models/user-table");
const Order = require("../models/payment-table");

const Razorpay = require("razorpay");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = dotenv.parsed;

var rzpinstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

exports.premiumUser = async (req, res, next) => {
  // const { userid, amount } = req.body;
  // console.log(req.user);
  // users
  // .createOrder({
  //   orderid: order.id,
  //   status: "pending",
  // })
  // console.log(req.user.id)
  try {
    const options = {
      amount: 50000,
      currency: "INR",
      // recept: "recpt45jk",
    };
    const order = await rzpinstance.orders.create(options);
    // res.json(order);
    if (!order) return res.status(500).send("Some error occured");
    await Order.create({
      paymentid: order.id,
      orderid: order.id,
      status: "PENDING",
    });

    res.status(201).json({
      order: order,
      key_id: rzpinstance.key_id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

exports.paymentSuccess = async (req, res, next) => {
  // console.log(req.user.id);
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;
  // console.log(req.user.id);
  try {
    const promise1 = Order.update(
      {
        status: "SUCCESSFUL",
        paymentid: razorpayPaymentId,
        orderId: razorpayOrderId,
        userId: req.user.id,
      },
      {
        where: {
          orderid: razorpayOrderId,
        },
      }
    );

    const promise2 = User.update(
      {
        ispremiumuser: true,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    Promise.all([promise1, promise2])
      .then(() => {
        res.status(201).json({
          msg: "Payment successfull!.",
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
        });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    //   console.log(err);
    return res.status(400).json({ error: err });
  }
};
