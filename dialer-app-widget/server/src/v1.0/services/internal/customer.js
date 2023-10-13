const { Admin } = require("../../models");

const viewDepartmentsById = async (id) => {
  const data = await Admin.findOne({ _id: id }, { department: 1 });
  return data;
};
const getAgentDetails = async (id) => {
  return await Admin.findOne({ _id: id }, { agents: { password: 0 } }).exec();
};

module.exports = {
  viewDepartmentsById,
  getAgentDetails,
};
