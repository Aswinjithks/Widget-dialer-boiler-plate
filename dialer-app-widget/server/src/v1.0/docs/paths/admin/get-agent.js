module.exports = ({ getResponses, defaultParameters, securityParameters }) => ({
  // operation's method
  get: {
    tags: ["Admin"], // operation's tag
    summary: "Get Agent Details ", // summary
    description: "Only admin have the access to get Agent Details", // short desc
    operationId: "getAgent", // unique operation id
    parameters: [...defaultParameters, ...securityParameters],
    requestBody: {
      required: false,
    },
    // expected responses
    responses: getResponses(["GetAgent", 400, 404]),
  },
});
