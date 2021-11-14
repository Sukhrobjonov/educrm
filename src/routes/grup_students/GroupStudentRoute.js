const {
    GroupSetStudentPostController,
} = require("../../controllers/GroupStudentController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.post("/", GroupSetStudentPostController);
router.put("/:applicant_id");
router.get("/:applicant_id");
router.get("/");

module.exports = {
    path: "/students",
    router,
};
