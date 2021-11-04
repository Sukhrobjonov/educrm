const permissionChecker = require("../helpers/permissionChecker");
const { CourseCreateValidation } = require("../modules/validations");
const path = require("path");
const fs = require("fs");

module.exports = class CourseController {
    static async CourseCreatePostController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const photo = req?.files?.photo;

            if (photo && photo?.size > 5 * 1024 * 1024) {
                throw new res.error(
                    400,
                    "Size of photo must be less than 5 mb"
                );
            }

            const data = await CourseCreateValidation(req.body, res.error);

            let photo_name = photo
                ? photo.md5 +
                  "." +
                  photo.mimetype.split("/")[
                      photo.mimetype.split("/").length - 1
                  ]
                : "null";

            if (photo) {
                photo.mv(
                    path.join(__dirname, "..", "public", "uploads", photo_name)
                );
            }

            const course = await req.db.courses.create({
                course_name: data.name,
                course_description: data.description,
                course_price: data.price,
                course_photo: photo_name,
            });

            res.status(200).json({
                ok: true,
                message: "Course created successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    static async CourseGetController(req, res, next) {
        try {
            const limit = req.query.limit || 15;
            const offset = req.query.offset - 1 || 0;
            const order = req.query.order == "DESC" ? "DESC" : "ASC";

            const courses = await req.db.courses.findAll({
                raw: true,
                limit,
                offset: offset * 15,
                order: [["createdAt", order]],
            });

            res.status(200).json({
                ok: true,
                message: "Courses list",
                data: {
                    courses:
                        courses.length === 0 ? "No courses available" : courses,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    static async CourseUpdetePutController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: {
                    course_id,
                },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course not found");

            const photo = req?.files?.photo;

            if (photo && photo?.size > 5 * 1024 * 1024) {
                throw new res.error(
                    400,
                    "Size of photo must be less than 5 mb"
                );
            }

            const data = await CourseCreateValidation(req.body, res.error);

            let photo_name = photo
                ? photo.md5 +
                  "." +
                  photo.mimetype.split("/")[
                      photo.mimetype.split("/").length - 1
                  ]
                : null;

            if (photo) {
                fs.unlink(
                    path.join(
                        __dirname,
                        "..",
                        "public",
                        "uploads",
                        course.course_photo
                    ),
                    () => {}
                );

                photo.mv(
                    path.join(__dirname, "..", "public", "uploads", photo_name)
                );
            }

            await req.db.courses.update(
                {
                    course_name: data.name,
                    course_description: data.description,
                    course_price: data.price,
                    course_photo: photo_name,
                },
                {
                    where: {
                        course_id,
                    },
                }
            );

            res.status(200).json({
                ok: true,
                message: "Course updated successfully",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async CourseGetOneController(req, res, next) {
        try {
            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: {
                    course_id,
                },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course not found");

            res.status(200).json({
                ok: true,
                message: "Course",
                data: { course },
            });
        } catch (error) {
            next(error);
        }
    }

    static async CourseDeleteController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: {
                    course_id,
                },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course not found");

            if (!course.course_photo === null) {
                fs.unlink(
                    path.join(
                        __dirname,
                        "..",
                        "public",
                        "uploads",
                        course.course_photo
                    ),
                    () => {}
                );
            }

            console.log(course);

            await req.db.courses.destroy({
                where: {
                    course_id,
                },
            });

            res.status(200).json({
                ok: true,
                message: "Course deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
};
