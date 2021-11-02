const {
    SignInPostController,
    CreateUserPostController,
} = require("../../controllers/UserController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.post("/sign_in", SignInPostController);
router.post(
    "/account",
    [authMiddleware, permissionMiddleware],
    CreateUserPostController
);

module.exports = {
    path: "/users",
    router,
};
