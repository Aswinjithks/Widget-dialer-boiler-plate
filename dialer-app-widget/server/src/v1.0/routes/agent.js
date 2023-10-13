const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const adminController = require("../controllers/admin");
const {
  isValidResetPasswordToken,
  isValidRefreshToken,
  isUserAuthenticated,
} = require("../middlewares/authorizer");
const {
  auth: { loginValidator, forgotPasswordValidator, resetPasswordValidator },
  //   user: { signUpValidator },
} = require("../validators");

router.post("/", makeCallback(adminController.createAgent));
router.get("/", makeCallback(adminController.getAgent));
router.patch("/:id", makeCallback(adminController.updateAgent));
router.delete("/:id", makeCallback(adminController.deleteAgent));

module.exports = router;
