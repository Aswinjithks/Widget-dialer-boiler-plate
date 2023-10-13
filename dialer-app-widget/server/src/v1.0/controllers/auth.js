const messages = require("../../config/messages");
const { BAD_REQUEST } = require("../../config/statusCodes");
const {
  sendOtpMail,
  sendPasswordResetEmail,
} = require("../services/external/email");
const {
  findAdminDetails,
  jwtVerifyToken,
} = require("../services/internal/admin");
const {
  verifyOtpCustomer,
  registerCustomer,
  handleLogout,
  passwordHashingAndSaving,
  validateOtp,
  adminPasswordSetTrue,
  otpHasingAndSaving,
  otpSetNull,
} = require("../services/internal/auth");

const customerSignup = async (req) => {
  const response = await registerCustomer(req.body);
  return response;
};
const customerOtpverify = async (req) => {
  const response = await verifyOtpCustomer(req.body);
  return response;
};

// const signUp = async (req) => {
//   const newUser = await createUser(req.body);
//   if (req?.body?.role === ROLE_CUSTOMER && req?.body?.refCode) {
//     const userMatched = await getUserByMatch({
//       referralCode: req?.body?.refCode,
//     });
//     if (userMatched) {
//       await updateUserByMatch(
//         { _id: newUser?._id },
//         { referrerCode: req?.body?.refCode }
//       );
//     }
//   }
//   return {
//     message: messages?.signUpSuccess,
//   };
// };

// const forgotPassword = async (req) => {
//   await handleForgotPassword(req?.body);
//   return { message: messages?.resetPasswordMailSent };
// };

// const resetPassword = async (req) => {
//   await handleResetPassword(req?.body);
//   return { message: messages?.passwordResetSuccess };
// };

// const refreshToken = async (req) => {
//   const { headers, data } = await handleRefreshToken(req?.body, req?.headers);
//   return { headers, data };
// };

const logout = async (req) => {
  await handleLogout(req?.user, req?.headers);
  return { message: messages?.logoutSuccess };
};

const adminResetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await findAdminDetails({ email });

    if (admin) {
      const passwordSetFlag = await adminPasswordSetTrue(admin);
      if (passwordSetFlag) {
        const response = await sendPasswordResetEmail(email);
        if (response) {
          return { message: messages.passwordResetMailSent };
        } else {
          return {
            statusCode: BAD_REQUEST,
            message: messages.errorFoundByEmail,
          };
        }
      } else {
        return { statusCode: BAD_REQUEST, message: messages.ErrorGenerateLink };
      }
    } else {
      return { statusCode: BAD_REQUEST, message: messages.userNotFound };
    }
  } catch (error) {
    return { statusCode: BAD_REQUEST, message: error.message };
  }
};

const adminResetPassLink = async (req, res) => {
  const { accessToken } = req.params;
  const { password } = req?.body;
  if (accessToken == null) {
    return { statusCode: BAD_REQUEST, message: messages.tokenNotProvided };
  }
  if (password == null) {
    return { statusCode: BAD_REQUEST, message: messages.passwordNotProvided };
  }

  const decodedToken = await jwtVerifyToken(accessToken);

  const { email, iat } = decodedToken;

  const tokenExpirationTimeInMinutes = 60;

  const currentTime = Math.floor(Date.now() / 1000);

  const timeElapsed = currentTime - iat;

  if (timeElapsed <= tokenExpirationTimeInMinutes * 60) {
    try {
      const admin = await findAdminDetails({ email });
      const result = await passwordHashingAndSaving(admin, password);

      if (result) {
        return { message: messages.passwordSetSuccessfully };
      } else {
        return {
          statusCode: BAD_REQUEST,
          message: messages.passwordAlreadySet,
        };
      }
    } catch (error) {
      return { statusCode: BAD_REQUEST, message: error.message };
    }
  } else {
    return {
      statusCode: BAD_REQUEST,
      message: linkExpired,
    };
  }
};

const adminSendEmailOtp = async (req, res) => {
  const { email } = req.body;

  const newOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
  try {
    const admin = await findAdminDetails({ email });

    const response = await sendOtpMail(email, newOtp);
    if (response === true) {
      const result = await otpHasingAndSaving(admin, newOtp);
      if (result) {
        return { message: messages.otpSend };
      }
    } else {
      return { statusCode: BAD_REQUEST, message: messages.errorFoundByEmail };
    }
  } catch (error) {
    return { statusCode: BAD_REQUEST, message: error.message };
  }
};

const adminVerifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const admin = await findAdminDetails({ email });

    if (admin.otp != null) {
      const result = await validateOtp(otp, admin.otp);
      if (result) {
        const otpAfterVerify = await otpSetNull(admin);
        if (otpAfterVerify) {
          return { message: messages.otpVerified };
        }
      } else {
        return { statusCode: BAD_REQUEST, message: messages.InvalidOtp };
      }
    } else {
      return { statusCode: BAD_REQUEST, message: messages.regenerateOtp };
    }
  } catch (error) {
    return { statusCode: BAD_REQUEST, message: error.message };
  }
};

const adminEmailOtpClear = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await findAdminDetails({ email });
    if (admin.otp != null) {
      const otpSetClear = otpSetNull(admin);
      if (otpSetClear) {
        return { statusCode: BAD_REQUEST, message: messages.otpExpired };
      }
    } else {
      return { statusCode: BAD_REQUEST, message: messages.otpAlreadyCleared };
    }
  } catch (error) {
    return { statusCode: BAD_REQUEST, message: error.message };
  }
};

module.exports = {
  // login,
  customerSignup,
  customerOtpverify,
  adminResetPass,
  adminResetPassLink,
  adminSendEmailOtp,
  adminVerifyEmailOtp,
  adminEmailOtpClear,
  //   signUp,
  //   forgotPassword,
  //   resetPassword,
  //   refreshToken,
  logout,
};
