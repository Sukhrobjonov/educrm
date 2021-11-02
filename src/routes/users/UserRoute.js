const {
    SignInPostController,
    CreateUserPostController,
} = require("../../controllers/UserController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/sign_in", SignInPostController);
router.post("/account", [authMiddleware], CreateUserPostController);

module.exports = {
    path: "/users",
    router,
};
