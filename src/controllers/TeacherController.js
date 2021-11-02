const permissionChecker = require("../helpers/permissionChecker");
const { AddTeacherValidation } = require("../modules/validations");

module.exports = class TeacherController {
    static async AddTeacherPostController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const data = await AddTeacherValidation(req.body, res.error);

            const teacher = await req.db.teachers.create({
                user_id: data.user_id,
                teacher_phone: data.phone,
                teacher_skills: data.skills,
            });

            res.status(201).json({
                ok: true,
                message: "Teacher created successfully",
            });
        } catch (error) {
            if (error.message === "Validation error") {
                error.message = "This user is already teacher";
                error.code = 400;
            } else if (
                error.message ===
                `insert or update on table \"teachers\" violates foreign key constraint \"teachers_user_id_fkey\"`
            ) {
                error.code = 400;
                error.message = "User id is invalid";
            }
            next(error);
        }
    }

    static async TeacherUpdatePutController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const teacher_id = req.params.teacher_id;

            console.log(teacher_id);

            const teacher = await req.db.teachers.findOne({
                where: { teacher_id },
                raw: true,
            });

            if (!teacher) throw new res.error(404, "Teacher not found");

            const data = await AddTeacherValidation(req.body, res.error);

            await req.db.teachers.update(
                {
                    user_id: data.user_id,
                    teacher_phone: data.phone,
                    teacher_skills: data.skills,
                },
                {
                    where: { teacher_id },
                }
            );

            res.status(200).json({
                ok: true,
                message: "Updated successfully",
            });
        } catch (error) {
            if (error.message === "Validation error") {
                error.message = "This user is already teacher";
                error.code = 400;
            }
            next(error);
        }
    }

    static async TeacherDeleteController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const teacher_id = req.params.teacher_id;

            const teacher = await req.db.teachers.destroy({
                where: { teacher_id },
            });

            if (!teacher) throw new res.error(404, "Teacher not found");

            res.status(200).json({
                ok: true,
                message: "Deleted successfully",
            });
        } catch (error) {
            if (error.message === "Validation error") {
                error.message = "This user is already teacher";
                error.code = 400;
            }
            next(error);
        }
    }

    static async TeacherGetController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const page = req.query.page ? req.query.page - 1 : 0;
            const limit = req.query.limit || 15;
            const order = req.query.order == "DESC" ? "DESC" : "ASC";

            const teachers = await req.db.teachers.findAll({
                raw: true,
                include: [
                    {
                        model: req.db.users,
                        attributes: { exclude: ["user_password"] },
                    },
                ],
                limit: limit,
                offset: page * 15,
                order: [["createdAt", order]],
            });

            res.status(200).json({
                ok: true,
                message: "Teachers list",
                data: {
                    teachers,
                },
            });
        } catch (error) {
            if (error.message === "Validation error") {
                error.message = "This user is already teacher";
                error.code = 400;
            }
            next(error);
        }
    }
};
