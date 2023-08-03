const dotenv = require("dotenv").config();
const { createTransport } = require("nodemailer");

const { BREVO_API_KEY } = dotenv.parsed;

exports.forgotPassword = async (req, res, next) => {
  //   console.log(BREVO_API_KEY);

  const { email } = req.body;

  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "shubhamnimje77@gmail.com",
      pass: BREVO_API_KEY,
    },
  });

  const mailOptions = {
    from: "shubhamnimje77@gmail.com",
    to: email,
    subject: "Email Subject",
    html: "<p>Email HTML Content</p>",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info.messageId);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};
