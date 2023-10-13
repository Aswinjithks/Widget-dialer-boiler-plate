const bcrypt = require("bcrypt");
const jwtDecode = require("jwt-decode");
const messages = require("../../config/messages");
const {
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
  agentSignin,
  saveAdmin,
  jwtVerifyToken,
  logoutAgent,
} = require("../services/internal/admin");
const {
  generatePayload,
  generateTokens,
} = require("../services/internal/auth");

const googleAuthentication = async (req) => {
  const token = req?.body?.token;
  const peerId = req?.body?.peerId;
  let adminObject = jwtDecode(token);
  if (adminObject) {
    const adminDetails = await googleAuth(adminObject, peerId);
    const payload = await generatePayload(adminDetails, "admin");
    const {accessToken, refreshToken} = await generateTokens(payload, req?.headers);
    return {
      data: {
        user: payload,
        accessToken,
        refreshToken
      },
    };
  } else {
    throw new Error(messages?.invalidToken);
  }
};

const adminSignIn = async (req) => {
  const email = req?.body?.email;
  const phone = req?.body?.phone;
  const admin = await findAdminDetails({ email, phone }); // email or phone number is needed
  const checkPassword = await bcrypt.compare(
    req?.body?.password,
    admin?.password
  );

  if (!checkPassword) throw new Error(messages?.passwordError);

  if (admin) {
    const payload = await generatePayload(admin, "admin");
    const { accessToken, refreshToken } = await generateTokens(
      payload,
      req?.headers
    );
    return {
      message: messages?.loggedIn,
      data: {
        user: payload,
        accessToken,
        refreshToken,
      },
    };
  }
};

const getDepartments = async (req) => {
  const { email } = req.user;
  const adminData = await viewDepartments(email);
  return {
    data: adminData.department,
  };
};

const getDepartmentsById = async (req) => {
  console.log("req is ", req.params.id);
  const id = req?.params?.id;
  const adminData = await viewDepartmentsById(id);
  return {
    data: adminData,
  };
};

const createDepartment = async (req) => {
  const { email } = req.user;
  const result = await checkPackage(email);
  console.log("result", result);
  if (result) {
    return await addDepartment(req?.body?.department, email);
  } else {
    return {
      statusCode: 400,
      message: messages?.packageLimitReached,
    };
  }
};

const editDepartment = async (req) => {
  await updateDepartment(req?.params?.id, req?.body);
};

const createAgent = async (req) => {
  const { email } = req.user;
  if (!req?.body?.password)
    return {
      statusCode: 400,
      message: messages?.passwordNotProvided,
      error: {
        password: messages?.passwordNotProvided,
      },
    };

  if (!req?.body?.username)
    return {
      statusCode: 400,
      message: messages?.userNameNotProvided,
      error: {
        username: messages?.userNameNotProvided,
      },
    };
  if (!req?.body?.department)
    return {
      statusCode: 400,
      message: messages?.departmentNotProvided,
      error: {
        department: messages?.departmentNotProvided,
      },
    };
  const result = await checkPackage(email);
  if (result) {
    await addAgent(req?.body, email);
  } else {
    throw new Error(messages?.packageLimitReached);
  }
};

const getAgent = async (req) => {
  const { email } = req.user;
  const data = await getAgentDetails(email);
  if (data) {
    return {
      data: { result: data.agents },
    };
  } else {
    throw new Error(messages?.notFound);
  }
};

const updateAgent = async (req) => {
  const { email } = req.user;
  const response = await modifyAgent(req.params?.id, req?.body, email);
  return response;
};

const deleteAgent = async (req) => {
  const { email } = req.user;
  const data = {};
  data.status = "inactive";
  const response = await modifyAgent(req.params?.id, data, email);
  return response;
};

const agentLogin = async (req) => {
  return await agentSignin(req.body,req.headers);
};

const agentLogout = async (req) => {
  const decodedToken = await jwtVerifyToken(req?.headers.token.split(" ")[1]);
  const { userId } = decodedToken;

  const response = await logoutAgent(userId);
  return response;
};

const getAdminScriptId = async (req, res) => {
  const { email } = req?.user;
  const admin = await findAdminDetails({ email });
  if (admin) {
    return { message: messages.success, data: { scriptId: admin._id } };
  } else return { statusCode: BAD_REQUEST, message: messages.adminNotFound };
};

const getAdminCallId = async (req, res) => {
  const { scriptId } = req.body;
  const adminData = await findAdminDetails({ scriptId });
  if (adminData) {
    return { message: messages.success, data: { peerId: adminData.peerId } };
  } else return { statusCode: BAD_REQUEST, message: messages.adminNotFound };
};

const getAdmin = async (req) => {
  const { email } = req.user;

  const data = await findAdminDetails({ email });

  if (data) {
    return {
      data: data,
    };
  } else {
    throw new Error(messages?.notFound);
  }
};

module.exports = {
  createDepartment,
  editDepartment,
  getDepartmentsById,
  googleAuthentication,
  createAgent,
  updateAgent,
  adminSignIn,
  getDepartments,
  getAgent,
  getAdminScriptId,
  getAdminCallId,
  getAdmin,
  deleteAgent,

  agentLogin,
  agentLogout,
};
