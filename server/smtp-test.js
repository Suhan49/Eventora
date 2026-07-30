require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function test() {
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected");

    const info = await transporter.sendMail({
      from: '"Eventora" <patilsuhan81@gmail.com>',
      to: "YOUR_OTHER_EMAIL@gmail.com", // use another email you can check
      subject: "SMTP Test",
      text: "This is a test email from Eventora.",
    });

    console.log("✅ Email sent");
    console.log(info);
  } catch (err) {
    console.error(err);
  }
}

test();