const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (email) => {
  const payload = {
    email: email,
    iat: Math.floor(Date.now() / 1000),
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

  // Configure nodemailer with your email service provider settings
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.SENDING_MAIL,
      pass: process.env.SENDING_MAIL_PASSWORD,
    },
  });

  // Create the password reset email
  const mailOptions = {
    from: process.env.SENDING_MAIL,
    to: email,
    subject: "Password Reset",
    text: `Please click the link below to initiate the password reset process. It is important to note that the link will expire within One hour :\n\n${process.env.EMAIL_RESET_LINK}/${accessToken}`,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  return (statusOfEmailSending = true);
};

const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.SENDING_MAIL,
      pass: process.env.SENDING_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDING_MAIL,
    to: email,
    subject: " One time password",
    text: `Enter this otp :\n ${otp}\n the otp will expires in 10 minute`,
  };

  const info = await transporter.sendMail(mailOptions);
  return (statusOfEmailSending = true);
};

module.exports = {
  sendPasswordResetEmail,
  sendOtpMail,
};
