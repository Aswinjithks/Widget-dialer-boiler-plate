const router = require("express").Router();
const makeCallback = require("../../utils/callback");
const adminController = require("../controllers/admin");

router.post("/", makeCallback(adminController.createDepartment));
router.get("/",makeCallback(adminController.getDepartments));
router.get("/:id",makeCallback(adminController.getDepartmentsById));
router.patch("/:id", makeCallback(adminController.editDepartment));

module.exports = router;