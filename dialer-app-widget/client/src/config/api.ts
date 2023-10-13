enum API {
  LOGIN = "/auth/signin",
  AGENT_LOGIN = "/auth/agent-signin",
  SIGNUP = "/auth/signup",
  LOGOUT = "/auth/logout",
  AGENT_LOGOUT = "/auth/agent-signout",
  GOOGLE_AUTH = "/auth/signup",
  FORGOT_PASSWORD = "/auth/forgot-password",
  RESET_PASSWORD = "/auth/reset-password",
  VALIDATE_RESET_PASSWORD = "/auth/reset-password/validate",
  REFRESH_TOKEN = "/auth/token",
  PROFILE = "/user/profile",
  DEPARTMENT = "/department",
  AGENT = "/agent",
  TICKET = "/ticket",
  CALL_DETAILS = "/call-details",
}

const publicEndpoints = [
  API.FORGOT_PASSWORD,
  API.AGENT_LOGIN,
  API.GOOGLE_AUTH,
  API.LOGIN,
  API.RESET_PASSWORD,
  API.LOGOUT,
  API.REFRESH_TOKEN,
  API.RESET_PASSWORD,
  API.SIGNUP,
  API.VALIDATE_RESET_PASSWORD,
];

const privateEndpoints = [
  API.PROFILE,
  API.DEPARTMENT,
  API.AGENT,
  API.CALL_DETAILS,
];

export { publicEndpoints, privateEndpoints };

export default API;
