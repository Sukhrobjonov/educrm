const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

app.use([authMiddleware, permissionMiddleware]);

//

module.exports = {
    path: "/teachers",
    router,
};
