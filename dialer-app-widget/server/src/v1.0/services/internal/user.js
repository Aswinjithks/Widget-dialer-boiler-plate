const {
  CODE_EMAIL_EXISTS,
  CODE_PHONE_NUMBER_EXISTS,
} = require("../../../config/constants");
const messages = require("../../../config/messages");
const { generateUUID } = require("../../helpers/string");
const jwt = require("jsonwebtoken");
const { Tickets, CallDetails } = require("../../models");
const { generatePasswordHash } = require("../../helpers/string");

const getUserByMatch = async (match, select = null) => {
  return await User.findOne(match).select(select);
};

const getUserByEmail = async (email, select = null) => {
  return await getUserByMatch({ email: new RegExp(`^${email}$`, "i") }, select);
};

// const ticket = async (req) => {
//   const id = generateRandomString(20);
//   const alreadyExist = await Admin.findOne({ "department.name": department });
//   if (!alreadyExist) {
//     await Admin.updateOne(
//       { email: email },
//       { $push: { department: { id: id, name: department } } }
//     );
//   } else {
//     throw new Error(`Deparment ${messages?.alreadyExist}`);
//   }
// };

const userAlreadyExists = async (email) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser && existingUser.email === email) {
    return existingUser;
  } else {
    throw new Error("User not found");
  }
};

const jwtVerifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    return { message: "Invalid or expired token" };
  }
};

const ticket = async (data) => {
  // const id = await generateUUID();
  // data.ticketNumber = id;
  try{
    await Tickets(data).save();
    return true
  }catch(error){
    return error
  }
  
};


const passwordHashingAndSaving = async (user, password) => {
  const hashedPassword = await generatePasswordHash(password);
  if (user.passwordSet) {
    user.password = hashedPassword;
    user.passwordSet = false;
    await user.save();
    return (passwordSetStatus = true);
  } else {
    return (passwordSetStatus = false);
  }
};

const otpSetNull = async (user) => {
  user.otp = null;
  await user.save();
  return (otpNull = true);
};

const otpHasingAndSaving = async (user, otp) => {
  const hashedPassword = await generatePasswordHash(otp);
  user.otp = hashedPassword;
  await user.save();
  return (otpStatus = true);
};

module.exports = {
  // addTicket,
  ticket,

  userAlreadyExists,
  // getUserByEmail,
  // jwtVerifyToken,
  // passwordHashingAndSaving,
  // passwordSetTrue,
};
