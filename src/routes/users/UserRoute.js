const {
    SignInPostController,
    CreateUserPostController,
    UserGetController,
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
router.get("/", [authMiddleware, permissionMiddleware], UserGetController);

module.exports = {
    path: "/users",
    router,
};
