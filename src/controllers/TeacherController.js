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
            // } else if (
            //     error.message ===
            //         `insert or update on table \"teachers\" violates foreign key constraint \"teachers_user_id_fkey\"` ||
            //     `"invalid input syntax for type uuid: \":42744782-5fc2-4ab8-8555-1b73063c2033\"`
            // ) {
            //     error.code = 400;
            //     error.message = "User id is invalid";
            // }
            next(error);
        }
    }
};
