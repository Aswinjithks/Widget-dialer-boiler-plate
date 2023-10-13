import ROLES from "../config/roles";

export const PUBLIC = {
  BASE_PATH: "/",
  PAGES: {
    LANDING: "home",
  },
};

// AUTH
export const AUTH = {
  BASE_PATH: "/auth",
  PAGES: {
    AGENT_LOGIN: "login/:username",
    LOGIN: "login",
    FORGOT_PASSWORD: "forgot-password",
    RESET_PASSWORD: "reset-password",
    OTP: "otp",
    SIGNIN: "signIn",
    SIGNUP: "signup",
  },
};

//PRIVATE
export const PRIVATE = {
  BASE_PATH: "/:userType",
  ADMIN: {
    ADMIN_BASE_PATH: ROLES.ADMIN,
    SUPER_ADMIN_BASE_PATH: ROLES.SUPER_ADMIN,
    PAGES: {
      INDEX: "dashboard",
      DASHBOARD: "dashboard",
      CALL_LOGS: "call-logs",
      CALL_LOGS_DETAILS: "call-logs/:id",
      CONTACTS: "contacts",
      KNOWLEDGE: "knowledge",
      REPORTS: "reports",
      ADMIN_VIEW: "admin-view",
      WIDGET: "admin-widget",
      EDIT_WIDGET: "edit-widget",
      AGENTS: "admin-agents",
      DEPARTMENT: "admin-department",
      SCRIPT_VIEW:"script-view"
    },
  },
  AGENT: {
    AGENT_BASE_PATH: ROLES.AGENT,

    PAGES: {
      INDEX: "dashboard",
      DASHBOARD: "dashboard",
      CALL_LOGS: "call-logs",
      CALL_LOGS_DETAILS: "call-logs/:id",
      CONTACTS: "contacts",
      KNOWLEDGE: "knowledge",
      REPORTS: "reports",
      ADMIN_VIEW: "admin-view",

    },
  },
};

export const ERROR = {
  ERROR_403: "/403",
  CATCH_ALL: "*",
};
