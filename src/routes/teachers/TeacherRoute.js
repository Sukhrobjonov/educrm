const {
    AddTeacherPostController,
    TeacherUpdatePutController,
    TeacherDeleteController,
    TeacherGetController,
} = require("../../controllers/TeacherController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.post("/", AddTeacherPostController);
router.put("/:teacher_id", TeacherUpdatePutController);
router.delete("/:teacher_id", TeacherDeleteController);
router.get("/", TeacherGetController);

module.exports = {
    path: "/teachers",
    router,
};
