const {
    GroupCreatePostController,
    GroupUpdatePutController,
} = require("../../controllers/GroupConrtoller");

const router = require("express").Router();

router.post("/", GroupCreatePostController);
router.put("/:group_id", GroupUpdatePutController);

module.exports = {
    path: "/groups",
    router,
};
