const messages = require("../config/messages");
const { OK } = require("../config/statusCodes");

module.exports = (callback) => (req, res, next) => {
  // define request variables
  const request = {
    body: req?.body ?? {},
    file: req?.file ?? null,
    files: req?.files ?? null,
    query: req?.query ?? {},
    params: req?.params ?? {},
    ip: req?.ip ?? "",
    method: req?.method ?? "",
    path: req?.path ?? "",
    user: req?.user ?? null,
    headers: {
      "device-id": req?.headers["device-id"] ?? "",
      "app-type": req?.headers["app-type"] ?? "",
      "content-type": req?.headers["content-type"] ?? "",
      referer: req?.headers["referer"] ?? "",
      "user-agent": req?.headers["user-agent"] ?? "",
      token: req?.headers["authorization"] ?? "",
    },
  };

  // success function
  const success = (response) => {
    const {
      statusCode = OK,
      message = messages?.success,
      headers = null,
      data,
      token,
      error=null,
    } = response ?? {};
    for (const headerKey in headers) {
      if (Object.hasOwnProperty.call(headers, headerKey)) {
        res.header(headerKey, headers[headerKey]);
      }
    }
    res.status(OK).send({ statusCode, message, data, token, error });
  };

  // invoke callback function, then handle response, catch error if any
  callback(request).then(success).catch(next);
};
