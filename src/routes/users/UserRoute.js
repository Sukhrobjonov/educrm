const { SignInPostController } = require("../../controllers/UserController");

const router = require("express").Router();

router.post("/sign_in", SignInPostController);

module.exports = {
    path: "/users",
    router,
};
