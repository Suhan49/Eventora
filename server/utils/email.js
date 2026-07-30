const axios = require("axios");

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Eventora",
          email: "patilsuhan81@gmail.com",
        },
        to: [
          {
            email: userEmail,
            name: userName,
          },
        ],
        subject: `Booking Confirmed: ${eventTitle}`,
        htmlContent: `
          <h2>Hi ${userName}!</h2>
          <p>Your booking for <strong>${eventTitle}</strong> is confirmed.</p>
          <p>Thank you for choosing Eventora.</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Booking email sent:", response.data);
  } catch (err) {
    console.error(
      "Booking Email Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

const sendOTPEmail = async (userEmail, otp, type) => {
  try {
    const title =
      type === "account_verification"
        ? "Verify your Eventora Account"
        : "Eventora Booking Verification";

    const message =
      type === "account_verification"
        ? "Please use the OTP below to verify your Eventora account."
        : "Please use the OTP below to verify your booking.";

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Eventora",
          email: "patilsuhan81@gmail.com",
        },
        to: [
          {
            email: userEmail,
          },
        ],
        subject: title,
        htmlContent: `
          <div style="font-family:Arial;padding:20px">
              <h2>${title}</h2>
              <p>${message}</p>

              <div style="
                background:#f5f5f5;
                padding:15px;
                font-size:28px;
                font-weight:bold;
                letter-spacing:6px;
                width:max-content;
                margin:auto;
              ">
                ${otp}
              </div>

              <p>This OTP expires in 5 minutes.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OTP Email Sent:", response.data);
  } catch (err) {
    console.error(
      "OTP Email Error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = {
  sendBookingEmail,
  sendOTPEmail,
};