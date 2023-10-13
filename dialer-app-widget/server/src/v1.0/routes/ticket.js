const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const adminController = require("../controllers/admin");
const ticketController = require("../controllers/ticket");

const {
  isValidResetPasswordToken,
  isValidRefreshToken,
  isUserAuthenticated,
} = require("../middlewares/authorizer");
const {
  auth: { loginValidator, forgotPasswordValidator, resetPasswordValidator },
  //   user: { signUpValidator },
} = require("../validators");

router.post("/", makeCallback(ticketController.createTicket));

module.exports = router;