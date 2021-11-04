const {
    ApplicantGetController,
    ApplicantPostController,
    ApplicantUpdatePutController,
} = require("../../controllers/ApplicantController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const router = require("express").Router();

router.use([authMiddleware, permissionMiddleware]);

router.get("/", ApplicantGetController);
router.post("/:course_id", ApplicantPostController);
router.put("/:applicant_id", ApplicantUpdatePutController);

module.exports = {
    path: "/applicants",
    router,
};
