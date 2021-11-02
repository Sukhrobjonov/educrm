const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.post("/");
router.put("/:course_id");
router.delete("/:teacher_id");
router.get("/");
router.get("/:course_id");

module.exports = {
    path: "/courses",
    router,
};
