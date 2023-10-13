const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("../docs");
const { isUserAuthenticated } = require("../middlewares/authorizer");
const { ensureRequestSanity } = require("../middlewares/request");

const admin = require("./admin");
const auth = require("./auth");
const customer = require("./customer");
const agent = require("./agent");
const department = require("./department");
const call_Details = require("./callDetails")
// const ticket = require("./ticket");
const ticket = require("./ticket");

// api documentations
if (process?.env?.NODE_ENV === "development") {
  router.use("/docs", swaggerUi.serve);
  router.get("/docs", swaggerUi.setup(swaggerDocument));
}

// middleware
// router.use(ensureRequestSanity());

// routes
router.use("/auth", auth);
router.use("/admin", isUserAuthenticated, admin);
router.use("/customer", customer);
router.use("/call-details",isUserAuthenticated, call_Details);
router.use("/agent",isUserAuthenticated, agent);
router.use("/department",isUserAuthenticated, department);
router.use("/ticket", ticket);
module.exports = router;
