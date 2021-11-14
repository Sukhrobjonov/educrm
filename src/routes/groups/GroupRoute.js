const {
    GroupCreatePostController,
    GroupUpdatePutController,
    GroupGetOneController,
    GroupGetAllController,
} = require("../../controllers/GroupConrtoller");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.post("/", GroupCreatePostController);
router.put("/:group_id", GroupUpdatePutController);
router.get("/:group_id", GroupGetOneController);
router.get("/", GroupGetAllController);

module.exports = {
    path: "/groups",
    router,
};
