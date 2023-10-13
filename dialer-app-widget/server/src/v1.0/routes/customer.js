const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const authController = require("../controllers/auth");
const customerController = require("../controllers/customer");

router.post("/register", makeCallback(authController.customerSignup));
router.post("/otp", makeCallback(authController.customerOtpverify));
router.get("/view-agents/:id", makeCallback(customerController.getAgent));
router.get("/view-departments/:id", makeCallback(customerController.getDepartmentsById));
router.get("/view-agents/:id", makeCallback(customerController.getAgent));

module.exports = router;