const {
    GroupCreatePostController,
} = require("../../controllers/GroupConrtoller");

const router = require("express").Router();

router.post("/", GroupCreatePostController);

module.exports = {
    path: "/groups",
    router,
};
