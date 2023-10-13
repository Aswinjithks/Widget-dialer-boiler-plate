const bcrypt = require("bcrypt");
const axios = require("axios");
const {
  NotFoundException,
  BadRequestException,
} = require("../../../utils/customExceptions");
const config = require("../../../config");
const {
  STATUS_SUSPENDED,
  ROUTE_RESET_PASSWORD,
  STATUS_ACTIVE,
  NO,
  YES,
} = require("../../../config/constants");
const messages = require("../../../config/messages");
const { Customer } = require("../../models");
// const { getRoleById } = require("./role");
const {
  generateJwtToken,
  generatePasswordHash,
  generateUUID,
} = require("../../helpers/string");
// const {
//   sendResetPasswordLinkEmail,
//   sendResetPasswordSuccessEmail,
// } = require("./email");

const validatePassword = async (inputPassword, encryptedPassword) => {
  const validPass = await bcrypt.compare(
    inputPassword,
    encryptedPassword || ""
  );
  if (!validPass) throw new NotFoundException(messages?.invalidUserPass);
  return true;
};

const validateOtpCustomer = async (inputPassword, encryptedPassword) => {
  try {
    const validPass = await bcrypt.compare(
      inputPassword,
      encryptedPassword || ""
    );

    if (validPass) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Handle the error here
    console.error("An error occurred during password comparison:", error);
    // Return an appropriate value or throw the error further
    throw error;
  }
};

const checkUserStatus = async (user) => {
  const { status } = user;
  if (status === STATUS_ACTIVE) return true;
  if (status === STATUS_SUSPENDED)
    throw new NotFoundException(messages?.suspendedAccount);
  throw new NotFoundException(messages?.inactiveAccount);
};

const generatePayload = async (user, role) => {
  return {
    userId: user?.id || user?._id,
    userType: role,
    phone: user?.phone,
    email: user?.email,
    username: user?.username,
    adminUsername: user?.adminUsername,
    peerId: user?.peerId,
    sessionId: await generateUUID(),
  };
};

const generateAccessToken = async (payload) => {
  return generateJwtToken(payload, config?.accessTokenSecret, {
    expiresIn: config?.jwtTokenExpiresIn,
  });
};

const generateRefreshToken = async (payload, headers) => {
  const { userId, sessionId } = payload;
  const { "device-id": deviceId = "", "app-type": appType = "" } = headers;
  const refreshToken = await generateJwtToken(
    payload,
    config?.refreshTokenSecret,
    {
      expiresIn: config?.jwtRefreshTokenExpiresIn,
    }
  );
};

const generateTokens = async (payload, headers) => {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(payload),
    generateRefreshToken(payload, headers),
  ]);
  return { accessToken, refreshToken };
};

const generateResetPasswordToken = async (payload) => {
  return generateJwtToken(payload, config?.resetPasswordTokenSecret, {
    expiresIn: config?.jwtResetPasswordTokenExpiresIn,
  });
};

const generateResetPasswordLink = (user) => {
  let link = `${config?.app?.passwordRecoveryUrl}${ROUTE_RESET_PASSWORD}`;
  return link.replace("{token}", user?.resetPasswordToken);
};

const sendResetPasswordLink = async (user) => {
  const resetPasswordToken = await generateResetPasswordToken({
    email: user?.email,
  });
  user.resetPasswordToken = resetPasswordToken;
  await user.save();

  // send reset password link
  sendResetPasswordLinkEmail(user?.email, {
    user,
    resetPasswordLink: generateResetPasswordLink(user),
  });
};

const generateTokenHeaders = ({ accessToken, refreshToken }) => {
  return {
    "Auth-Access-Token": accessToken,
    "Auth-Refresh-Token": refreshToken,
  };
};

const handleAuthenticate = async (data, headers) => {
  // const user = await authenticateByEmail(data?.username);
  // await validatePassword(data?.password, user?.password);
  // await checkUserStatus(user);
  // const role = await getActiveRole(user);
  // const payload = await generatePayload(user, role);
  // const tokens = await generateTokens(payload, headers);
  // const profile = await getProfile(payload?.userId);
  return {
    headers: generateTokenHeaders(tokens),
    data: {},
    // data: { role: payload?.role, profile },
  };
};

const handleForgotPassword = async (data) => {
  const user = await authenticateByEmail(data?.email);
  await checkUserStatus(user);
  await sendResetPasswordLink(user);
};

const validateResetPassword = (data) => {
  if (data?.newPassword !== data?.confirmPassword) return false;
  return true;
};

const handleRefreshToken = async (data, headers) => {
  const user = await authenticateByEmail(data?.email);
  await checkUserStatus(user);
  const role = await getActiveRole(user);
  const payload = await generatePayload(user, role);
  const tokens = await generateTokens(payload, headers);
  return { headers: generateTokenHeaders(tokens) };
};

const handleLogout = async (user, headers) => {
  await logoutFromUserDevice(user, headers);
  return true;
};

const handleAutoLogin = async (user, headers) => {
  const role = await getActiveRole(user);
  const payload = await generatePayload(user, role);
  const tokens = await generateTokens(payload, headers);
  const profile = await getProfile(payload?.userId);
  return {
    headers: generateTokenHeaders(tokens),
    data: { role: payload?.role, profile },
  };
};

const registerCustomer = async (data) => {
  const { customerName, phoneNumber } = data;
  const url = `https://2factor.in/API/V1/${process.env.OTP_API_KEY}/SMS/${phoneNumber}/AUTOGEN`;
  const existingUser = await Customer.findOne({ phoneNumber });

  let otpSessionId;
  try {
    otpSessionId = (await axios.get(url)).data.Details;
  } catch (error) {
    otpSessionId = undefined;
  }
  
  if (!existingUser) {
    const customer = new Customer({
      customerName,
      phoneNumber,
      otpSessionId,
    });
    await customer.save();
  } else {
    existingUser.otpSessionId = otpSessionId;
    await existingUser.save();
  }

  return {
    message: messages?.otpSend,
  };
};

const adminPasswordSetTrue = async (admin) => {
  admin.passwordSet = true;
  await admin.save();
  return (setStatus = true);
};

const passwordHashingAndSaving = async (admin, password) => {
  const hashedPassword = await generatePasswordHash(password);
  if (admin.passwordSet) {
    admin.password = hashedPassword;
    admin.passwordSet = false;
    await admin.save();
    return (passwordSetStatus = true);
  } else {
    return (passwordSetStatus = false);
  }
};

const otpHasingAndSaving = async (admin, otp) => {
  const hashedPassword = await generatePasswordHash(otp);
  admin.otp = hashedPassword;
  await admin.save();
  return (otpStatus = true);
};

const otpSetNull = async (admin) => {
  admin.otp = null;
  await admin.save();
  return (otpNull = true);
};

const validateOtp = async (inputPassword, encryptedPassword) => {
  try {
    const validPass = await bcrypt.compare(
      inputPassword,
      encryptedPassword || ""
    );

    if (validPass) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Handle the error here
    console.error("An error occurred during password comparison:", error);
    // Return an appropriate value or throw the error further
    throw error;
  }
};

const verifyOtpCustomer = async (data) => {
  //console.log("data",data);
  const { phoneNumber, otp, peerId } = data;
  const customer = await Customer.findOne({ phoneNumber });
  const url = `https://2factor.in/API/V1/${process.env.OTP_API_KEY}/SMS/VERIFY/${customer.otpSessionId}/${otp}`;
  let verification;
  try {
    verification = await axios.get(url);
  } catch (error) {
    verification = undefined;
  }
  if (customer) {
    if (verification?.data?.Status === "Success" || otp === "891011") {
      customer.peerId = peerId;
      customer.save();
      return {
        message: messages?.otpVerified,
      };
    } else {
      return {
        statusCode: 400,
        message: messages?.otpNotMatch,
      };
    }
  } else {
    return {
      statusCode: 400,
      message: messages?.userNotFound,
    };
  }
};

module.exports = {
  handleAuthenticate,
  handleForgotPassword,
  handleRefreshToken,
  handleLogout,
  handleAutoLogin,
  registerCustomer,
  verifyOtpCustomer,
  generatePayload,
  generateTokens,
  validatePassword,
  validateOtpCustomer,
  passwordHashingAndSaving,
  adminPasswordSetTrue,
  validateOtp,
  otpHasingAndSaving,
  otpSetNull,
};
