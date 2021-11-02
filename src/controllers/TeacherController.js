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
};
