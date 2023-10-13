const { sendOtpMail } = require("../services/external/email");
const {
  otpSend,
  errorFoundByEmail,
  otpAlreadySent,
  otpVerified,
  InvalidOtp,
  regenerateOtp,
  otpExpired,
  otpAlreadyCleared,
} = require("../../config/messages");

const { BAD_REQUEST } = require("../../config/statusCodes");

const {
  userAlreadyExists,
  otpHasingAndSaving,
  otpSetNull,
} = require("../services/internal/user");

const { validateOtp } = require("../services/internal/auth");

const userSendOtpMail = async (req, res) => {
  const { email } = req.body;
  const newOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    existingEmail = await userAlreadyExists(email);

    const response = await sendOtpMail(email, newOtp);
    if (response === true) {
      const result = await otpHasingAndSaving(existingEmail, newOtp);
      if (result) {
        return { message: otpSend };
      }
    } else {
      return { BAD_REQUEST, message: errorFoundByEmail };
    }
  } catch (error) {
    return { BAD_REQUEST, message: error.message };
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existingUser = await userAlreadyExists(email, otp);

    if (existingUser.otp != null) {
      const result = await validateOtp(otp, existingUser.otp);
      if (result) {
        const otpAfterVerify = await otpSetNull(existingUser);
        if (otpAfterVerify) {
          return { message: otpVerified };
        }
      } else {
        return { BAD_REQUEST, message: InvalidOtp };
      }
    } else {
      return { BAD_REQUEST, message: regenerateOtp };
    }
  } catch (error) {
    return { BAD_REQUEST, message: error.message };
  }
};

const otpClearing = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await userAlreadyExists(email);
    if (existingUser.otp != null) {
      const otpSetClear = otpSetNull(existingUser);
      if (otpSetClear) {
        return { BAD_REQUEST, message: otpExpired };
      }
    } else {
      return { BAD_REQUEST, message: otpAlreadyCleared };
    }
  } catch (error) {
    return { BAD_REQUEST, message: error.message };
  }
};

module.exports = {
  userSendOtpMail,
  otpClearing,
  verifyOtp,
};
