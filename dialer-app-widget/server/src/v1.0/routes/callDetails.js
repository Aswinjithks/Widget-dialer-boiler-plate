const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const callDetailsController = require("../controllers/callDetails")

const {
  isValidResetPasswordToken,
  isValidRefreshToken,
  isUserAuthenticated,
} = require("../middlewares/authorizer");
const {
  auth: { loginValidator, forgotPasswordValidator, resetPasswordValidator },
  //   user: { signUpValidator },
} = require("../validators");


router.post("/", makeCallback(callDetailsController.createCallDetails));
router.patch("/:id", makeCallback(callDetailsController.updateCallDetails));
router.get("/", makeCallback(callDetailsController.getCallDetails));


module.exports = router;