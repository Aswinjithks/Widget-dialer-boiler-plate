const e = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const messages = require("../../../config/messages");
const {
  generateRandomString,
  generatePasswordHash,
  generateUUID,
} = require("../../helpers/string");
const { Admin, WidgetPackages } = require("../../models");
const { generatePayload, generateTokens } = require("./auth");

const PACKEAGE_ID = "646b2059e528be9444eff887";

const googleAuth = async (adminData, peerId) => {
  const { name, email, picture } = adminData;
  let admin = await Admin.findOne({ email });

  if (!admin) {
    admin = new Admin({
      email,
      username: name.replace(/\s/g, "").toLowerCase(),
      picture,
      peerId,
      packageId: PACKEAGE_ID,
    });
  } else {
    admin.email = email;
    admin.username = name.replace(/\s/g, "").toLowerCase();
    admin.picture = picture;
  }
  await admin.save();
  return {
    id: admin._id,
    message: admin ? messages.updated : messages.created,
    email,
    username: admin.username,
    picture,
    peerId: admin.peerId || peerId,
  };
};

const findAdminDetails = async ({ email, phone, scriptId }) => {
  let admin;

  if (email) admin = await Admin.findOne({ email: email });
  if (phone) admin = await Admin.findOne({ phone: phone });
  if (phone) admin = await Admin.findOne({ _id: scriptId });

  return admin;
};

const viewDepartments = async (email) => {
  const data = await Admin.findOne({ email: email });
  return data;
};

const viewDepartmentsById = async (id) => {
  const data = await Admin.findOne({ _id: id });
  return data;
};

const addDepartment = async (department, email) => {
  const id = generateRandomString(20);
  const alreadyExist = await Admin.findOne({
    email,
    "department.name": department,
  });
  if (!alreadyExist) {
    return await Admin.updateOne(
      { email: email },
      { $push: { department: { id: id, name: department } } }
    );
  } else {
    return {
      statusCode: 400,
      message: `Deparment ${messages?.alreadyExist}`,
    };
  }
};

const checkPackage = async (email) => {
  const admin = await Admin.findOne({ email: email });
  const package = await WidgetPackages.findById(admin?.packageId);
  console.log("checkPackage", package);
  if (
    admin?.department?.length <= package?.numberOfDepartments &&
    admin?.agents?.length <= package?.numberOfUsers
  )
    return true;

  return false;
};

const updateDepartment = async (deptId, data) => {
  await Admin.updateOne(
    { "department.id": deptId },
    { $set: { "department.$.name": data.department } }
  );
};

const addAgent = async (data, email) => {
  const alreadyExist = await Admin.findOne({
    email,
    "agents.username": data.username,
  });
  if (!alreadyExist) {
    const Id = await generateUUID();
    const bcryptPassword = await generatePasswordHash(data.password);

    data.id = Id;
    data.status = "active";
    data.callStatus = "available";
    data.idle  = false;
    data.password = bcryptPassword;

    await Admin.updateOne({ email: email }, { $push: { agents: data } });
  } else {
    throw new Error(`Username ${messages?.alreadyExist}`);
  }
};

const getAgentDetails = async (email) => {
  // const alreadyExist = await Admin.findOne({ email:email,"agents.status": 'active'}, { 'agents.$': 1,'agents.password': 0 }).exec();
  // console.log('alreadyExist--',alreadyExist);
  return await Admin.findOne(
    { email: email },
    { agents: { password: 0 } }
  ).exec();
};

const modifyAgent = async (agentId, data, email) => {
  let alreadyExist = false;
  if (data?.username) {
    alreadyExist = await Admin.findOne({
      email,
      "agents.username": data?.username,
    });
    if (alreadyExist?.agents) {
      return {
        statusCode: 400,
        message: messages?.usernameAlreadyExist,
        error: {
          username: messages?.usernameAlreadyExist,
        },
      };
    }
  }

  let newData = {};
  if (data?.password) {
    const bcryptPassword = await generatePasswordHash(data?.password);
    newData["agents.$.password"] = bcryptPassword;
  }
  if (data?.username) newData["agents.$.username"] = data?.username;
  if (data?.department) newData["agents.$.department"] = data?.department;
  if (data?.status) newData["agents.$.status"] = data?.status;
  if (data?.callStatus) newData["agents.$.callStatus"] = data?.callStatus;
  if (data?.idle) newData["agents.$.idle"] = data?.idle;
  await Admin.updateOne(
    {username: data.adminUsername, "agents.id": agentId },
    {
      $set: newData,
    }
  );
};

const logoutAgent = async (agentId) => {
  await Admin.updateOne(
    { "agents.id": agentId },
    {
      $set: { "agents.$.isOnline": false },
    }
  );
};

const agentSignin = async (data,headers) => {
  const agentDetails = await Admin.findOne(
    { username: data.adminUsername, "agents.username": data.username },
    { "agents.$": 1 }
  ).exec();

  if (agentDetails?.agents[0]?.password) {
    const agent = await bcrypt.compare(
      data?.password,
      agentDetails?.agents[0]?.password
    );
    if (!agent) {
      return {
        message: messages?.invalidLogin,
        statusCode: 400,
      };
    }
    await Admin.updateOne(
      { username: data.adminUsername, "agents.username": data.username },
      { $set: {  "agents.$.isOnline": true } }
    );
    console.log("data", data, "agentDetails", agentDetails);
    agentDetails.agents[0].adminUsername = data.adminUsername 
    const payload = await generatePayload(agentDetails?.agents[0], "agent");
    const { accessToken, refreshToken } = await generateTokens(
      payload,
     headers
    );
    return {
      message: messages?.loggedIn,
      data: {
        user: {
          id: agentDetails?.agents[0]?.id,
          userName: agentDetails?.agents[0]?.username,
          department: agentDetails?.agents[0]?.department,
          userType: payload.userType,
          peerId: agentDetails?.agents[0]?.peerId,
          adminUsername: data?.adminUsername,
          isOnline: true,
        },
        accessToken,
        refreshToken,
      },
    };
  } else {
    return {
      message: messages?.invalidLogin,
      statusCode: 400,
    };
  }
  // return await Admin.findOne(
  //   { username: data.adminUsername, "agents.username": data.username },
  //   { "agents.$": 1 }
  // ).exec();
};

const jwtVerifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    return { message: "Invalid or expired token" };
  }
};

module.exports = {
  addDepartment,
  checkPackage,
  updateDepartment,
  addAgent,
  modifyAgent,
  googleAuth,
  findAdminDetails,
  viewDepartments,
  viewDepartmentsById,
  getAgentDetails,
  jwtVerifyToken,

  agentSignin,
  logoutAgent
};
