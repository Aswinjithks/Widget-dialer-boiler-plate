const { sendPasswordResetEmail } = require("../services/external/email");
const {
  passwordResetMailSent,
  errorFoundByEmail,
  tokenNotProvided,
  passwordNotProvided,
  passwordAlreadySet,
  linkExpired,
  passwordSetSuccessfully,
  ErrorGenerateLink,
} = require("../../config/messages");

const { BAD_REQUEST } = require("../../config/statusCodes");

const {
  userAlreadyExists,
  jwtVerifyToken,
  passwordHashingAndSaving,
  passwordSetTrue,
} = require("../services/internal/user");
const messages = require("../../config/messages");

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userAlreadyExists(email);
    const passwordSetFlag = await passwordSetTrue(existingUser);
    if (passwordSetFlag) {
      const response = await sendPasswordResetEmail(email);
      if (response) {
        return { message: passwordResetMailSent };
      } else {
        return { statusCode: BAD_REQUEST, message: errorFoundByEmail };
      }
    } else {
      return { statusCode: BAD_REQUEST, message: ErrorGenerateLink };
    }
  } catch (error) {
    return { statusCode: BAD_REQUEST, message: error.message };
  }
};

const setPasswordThroughLink = async (req, res) => {
  const { accessToken } = req.params;
  const { password } = req?.body;

  if (accessToken == null) {
    return { statusCode: BAD_REQUEST, message: tokenNotProvided };
  }
  if (password == null) {
    return { statusCode: BAD_REQUEST, message: passwordNotProvided };
  }

  const decodedToken = await jwtVerifyToken(accessToken);

  const { email, iat } = decodedToken;

  const tokenExpirationTimeInMinutes = 60;

  const currentTime = Math.floor(Date.now() / 1000);

  const timeElapsed = currentTime - iat;

  if (timeElapsed <= tokenExpirationTimeInMinutes * 60) {
    try {
      const passwordUpdatingUser = await userAlreadyExists(email);

      const result = await passwordHashingAndSaving(
        passwordUpdatingUser,
        password,
      );

      if (result) {
        return { message: passwordSetSuccessfully };
      } else {
        return {
          statusCode: BAD_REQUEST,
          message: passwordAlreadySet,
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

module.exports = {
  sendResetPasswordEmail,
  setPasswordThroughLink,
};
