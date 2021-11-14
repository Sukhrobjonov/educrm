const {
    GroupSetStudentPostController,
    GroupStudentsGetAllController,
} = require("../../controllers/GroupStudentController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.post("/", GroupSetStudentPostController);
router.get("/", GroupStudentsGetAllController);

module.exports = {
    path: "/students",
    router,
};
