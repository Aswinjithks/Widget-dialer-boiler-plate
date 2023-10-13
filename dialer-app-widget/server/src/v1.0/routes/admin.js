const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const adminController = require("../controllers/admin");
// const userController = require("../controllers/userController");
const passwordSetUpController = require("../controllers/passwordSetUpController");
const otpController = require("../controllers/otpController");

const {
  isValidResetPasswordToken,
  isValidRefreshToken,
  isUserAuthenticated,
} = require("../middlewares/authorizer");
const {
  auth: { loginValidator, forgotPasswordValidator, resetPasswordValidator },
  //   user: { signUpValidator },
} = require("../validators");

// router.post("/signup", makeCallback(adminController.saveAdminDetails));
// router.post("/signin", makeCallback(adminController.adminSignIn));
router.get("/script-id", makeCallback(adminController.getAdminScriptId));
router.get("/call-id", makeCallback(adminController.getAdminCallId));
router.get("/details", makeCallback(adminController.getAdmin));

module.exports = router;
