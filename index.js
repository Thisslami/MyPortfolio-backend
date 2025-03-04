const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail Address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Email Error:", error);
    res.json({ success: false, message: "Failed to send message" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
