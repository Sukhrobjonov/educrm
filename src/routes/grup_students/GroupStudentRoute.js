const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.post("/", GroupCreatePostController);
router.put("/:group_student_id", GroupUpdatePutController);
router.get("/:group_student_id", GroupGetOneController);
router.get("/", GroupGetAllController);

module.exports = {
    path: "/groups",
    router,
};
