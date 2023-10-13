const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const adminController = require("../controllers/admin");
const authController = require("../controllers/auth");

//admin
router.post("/signup", makeCallback(adminController.googleAuthentication));
router.post("/signin", makeCallback(adminController.adminSignIn));
router.get("/reset-password", makeCallback(authController.adminResetPass));
router.post(
  "/reset-password-link/:accessToken",
  makeCallback(authController.adminResetPassLink),
);
router.get(
  "/email-otp-generate",
  makeCallback(authController.adminSendEmailOtp),
);
router.post(
  "/email-otp-verify",
  makeCallback(authController.adminVerifyEmailOtp),
);
router.get(
  "/email-otp-clearing",
  makeCallback(authController.adminEmailOtpClear),
);

//agent
router.post("/agent-signin", makeCallback(adminController.agentLogin));
router.post("/agent-signout", makeCallback(adminController.agentLogout));

module.exports = router;
