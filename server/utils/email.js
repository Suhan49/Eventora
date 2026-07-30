const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP Server Ready");
  }
});


const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            // from: process.env.EMAIL_USER,
               from: '"Eventora" <patilsuhan81@gmail.com>',

            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
        <h2>Hi ${userName}!</h2>
        <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
        <p>Thank you for choosing Eventora.</p>
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        console.log("7. sendOTPEmail called");

        const title =
            type === "account_verification"
                ? "Verify your Eventora Account"
                : "Eventora Booking Verification";

        const msg =
            type === "account_verification"
                ? "Please use the following OTP to verify your new Eventora account."
                : "Please use the following OTP to verify and confirm your event booking.";

        const mailOptions = {
            from: '"Eventora" <patilsuhan81@gmail.com>',
            to: userEmail,
            subject: title,
            html: `
                <h2>${title}</h2>
                <p>${msg}</p>
                <h1>${otp}</h1>
            `,
        };

        console.log("8. About to send email");
        console.log(mailOptions);

        try {
    const info = await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("SMTP Timeout after 15 seconds")), 15000)
        )
    ]);

    console.log("9. Email sent successfully");
    console.log(info);

} catch (err) {
    console.error("SMTP ERROR:");
    console.error(err);

    throw err;
}
    } catch (error) {
        console.error("SEND OTP ERROR:");
        console.error(error);
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };