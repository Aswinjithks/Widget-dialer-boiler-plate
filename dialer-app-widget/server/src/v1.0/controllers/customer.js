const {
  viewDepartmentsById,
  getAgentDetails,
} = require("../services/internal/customer");

const getDepartmentsById = async (req) => {
  console.log("req is ", req.params.id);
  const id = req?.params?.id;
  const adminData = await viewDepartmentsById(id);
  return {
    data: adminData,
  };
};

const getAgent = async (req) => {
  console.log("req is ", req.params.id);
  const id = req?.params?.id;
  const dept_name = req?.query?.dept_name;
  const data = await getAgentDetails(id);
  // console.log("ggg=--", data.agents);
  const activeAgents = data?.agents?.filter(
    (item) =>
      item.status === "active" &&
      item.callStatus === "available" &&
      item.isOnline === true &&
      item.department === dept_name
  );
  console.log("activeAgents--", activeAgents);
  // console.log('uuuu',tt);
  if (data) {
    return {
      data: { result: activeAgents },
    };
  } else {
    throw new Error(messages?.notFound);
  }
};

module.exports = {
  getDepartmentsById,
  getAgent,
};
