const messages = require("../../config/messages");
const statusCodes = require("../../config/statusCodes");
const { modifyAgent } = require("../services/internal/admin");
const {
  addCallDetails,
  modifyCallDetails,
  getCallData,
} = require("../services/internal/callDetails");
const { addTicket } = require("../services/internal/user");

const createTicket = async (req) => {
  await addTicket(req?.body);
};

const createCallDetails = async (req) => {
  try {
    const { id } = await addCallDetails(req?.body,req.user);
    if(req.user.userType === 'agent'){
      await modifyAgent(req.user?.userId,{callStatus:"calling"})

    }
    return {
      message: messages.success,
      statusCode: statusCodes.OK,
      data: {
        id: id,
      },
    };
  } catch (error) {
    console.error("Error creating call details:", error);
    throw new Error("Failed to create call details");
  }
};

const updateCallDetails = async (req, res) => {
  await modifyCallDetails(req?.body, req?.params?.id);
  if(req.user?.userType === 'agent'){
    await modifyAgent(req.user?.userId,{callStatus:"available"})

  }
};

const getCallDetails = async (req) => {
  const page = req?.query?.page;
  const perpage = req?.query?.perpage
  const callDetails = await getCallData(req.user , page , perpage);
  return {
    message: messages.success,
    statusCode: statusCodes.OK,
    data: callDetails,
  };
};

module.exports = {
  createTicket,
  createCallDetails,
  updateCallDetails,
  getCallDetails,
};
