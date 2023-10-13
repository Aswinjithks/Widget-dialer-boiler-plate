const { CallDetails , Admin } = require("../../models");
var ObjectId = require("mongoose").Types.ObjectId;

const addCallDetails = async (data,user) => {
  console.log("user ",user.adminUsername);
  data.adminUsername = user.adminUsername;
  const callDetails = await CallDetails(data).save();
  return {
    id: callDetails._id,
  };
};

const modifyCallDetails = async (data, id) => {
  await CallDetails.findByIdAndUpdate(
    { _id: id },
    {
      // department: data.department,
      // from: data.from,
      // to: data.to,
      duration: data?.duration,
      callStatus: data?.callStatus,
      date:data?.date
      // ticket: data.ticket,
      // assignee: data.assignee,
      // contact: data.contact,
      // time: data.time,
    }
  );
};

const getCallData = async (user ,page, perPage) => {
  let callDetails;
  let totalCount;
  if (user.userType === "agent") {
    callDetails = await CallDetails.find({ to: user?.username }).skip((page - 1) * perPage).limit(parseInt(perPage)).exec();
    totalCount = await CallDetails.countDocuments({ to: user?.username });
  }
  if (user.userType === "admin") {
    callDetails = await CallDetails.find({ adminUsername: user.username }).skip((page - 1) * perPage).limit(parseInt(perPage)).exec();
    totalCount = await CallDetails.countDocuments({ adminUsername: user.username });
  }

  return { callDetails, totalCount };
};

module.exports = {
  addCallDetails,
  modifyCallDetails,
  getCallData,
};
