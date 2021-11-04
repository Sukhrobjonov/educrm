const {
    ApplicantGetController,
    ApplicantPostController,
} = require("../../controllers/ApplicantController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.get("/", ApplicantGetController);
router.post("/:course_id", ApplicantPostController);

module.exports = {
    path: "/applicants",
    router,
};
