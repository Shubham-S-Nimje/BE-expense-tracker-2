const dotenv = require("dotenv").config();
const { createTransport } = require("nodemailer");
const nodemailer = require("nodemailer");
const Forgotpass = require("../models/forgot-pass");
const User = require("../models/user-table");
const { UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const { BREVO_API_KEY } = dotenv.parsed;

exports.forgotPassword = async (req, res, next) => {
  //   console.log(BREVO_API_KEY);

  const { email } = req.body;
  const token = uuidv4();
  // console.log(token);

  try {
    const user = await User.findOne({ email });
    if (user) {
      const forgotpass = await Forgotpass({
        token,
        active: true,
        userId: user._id,
      });
      await forgotpass.save();

      const transporter = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: "shubhamnimje77@gmail.com",
          pass: BREVO_API_KEY,
        },
      });

      // console.log(transporter);

      const resetLink = `http://localhost:4000/auth/resetpassword/${token}`;

      const mailOptions = {
        from: "shubhamnimje77@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<p>Click here to Reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
      };

      const info = await transporter.sendMail(mailOptions);
      // console.log("Email sent successfully", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(404).json({ error: "User not found", success: false });
    }
  } catch (error) {
    // console.log("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

exports.resetpassword = (req, res) => {
  const token = req.params.requestId;
  // console.log(token);
  Forgotpass.findOne({ token }).then((Forgotpassrequest) => {
    if (Forgotpassrequest) {
      Forgotpass.findOneAndUpdate(token, { isactive: false });
      res.send(`<html>
            <script>
              function formsubmitted(e){
                e.preventDefault();
                console.log('called');
              }
            </script>
            <form action="/auth/updatepassword/${token}" method="post"> <!-- Changed method to "post" -->
              <label for="newpassword">Enter New password</label>
              <input name="newpassword" type="password" required></input>
              <button type="submit">reset password</button> <!-- Added "type" attribute to the button -->
            </form>
          </html>`);
    } else {
      res.status(404).send("Invalid reset password link");
    }
  });
};

exports.updatepassword = async (req, res) => {
  try {
    const { newpassword } = req.body;
    const { resetId } = req.params;

    // console.log(newpassword,resetId)

    const resetpasswordrequest = await Forgotpass.findOne({ token: resetId });

    // console.log(resetpasswordrequest);

    if (!resetpasswordrequest) {
      return res
        .status(404)
        .json({ error: "Invalid reset password link", success: false });
    }
    const user = await User.findById(resetpasswordrequest.userId);
    if (!user) {
      return res.status(404).json({ error: "No user exists", success: false });
    }
    // Encrypt the password
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(newpassword, salt);
      await User.findByIdAndUpdate(resetpasswordrequest.userId, {
        password: hash,
      });
      // res
      //   .status(201)
      //   .json({
      //     message: "Successfully updated the new password",
      //     success: true,
      //   });
      res.send(`<html>
            <div>
              <H2>Successfully updated the new password!..</H2>
              <a href="http://localhost:3000/Expense-Tracker-2">Log In</a>
            </div>
          </html>`);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Error updating the password", success: false });
    }
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};
