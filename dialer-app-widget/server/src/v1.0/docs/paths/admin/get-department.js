module.exports = ({ getResponses, defaultParameters, securityParameters }) => ({
  // operation's method
  get: {
    tags: ["Admin"], // operation's tag
    summary: "Get Departments Details ", // summary
    description: "Only admin have the access to get Departments Details", // short desc
    operationId: "getDepartment", // unique operation id
    parameters: [...defaultParameters, ...securityParameters],
    requestBody: {
      required: false,
    },
    // expected responses
    responses: getResponses(["GetDepartment", 400, 404]),
  },
});
