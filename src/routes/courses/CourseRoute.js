const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");
const expressFileUploadMiddleware = require("express-fileupload");
const {
    CourseCreatePostController,
    CourseGetController,
    CourseUpdetePutController,
    CourseGetOneController,
    CourseDeleteController,
} = require("../../controllers/CourseController");

const router = require("express").Router();

// router.use([authMiddleware, permissionMiddleware]);

router.post(
    "/",
    [
        authMiddleware,
        permissionMiddleware,
        expressFileUploadMiddleware({
            abortOnLimit: true,
            safeFileNames: true,
        }),
    ],
    CourseCreatePostController
);
router.get("/", CourseGetController);
router.put(
    "/:course_id",
    [
        authMiddleware,
        permissionMiddleware,
        expressFileUploadMiddleware({
            abortOnLimit: true,
            safeFileNames: true,
        }),
    ],
    CourseUpdetePutController
);
router.get("/:course_id", CourseGetOneController);
router.delete(
    "/:course_id",
    [
        authMiddleware,
        permissionMiddleware,
        expressFileUploadMiddleware({
            abortOnLimit: true,
            safeFileNames: true,
        }),
    ],
    CourseDeleteController
);

module.exports = {
    path: "/courses",
    router,
};
