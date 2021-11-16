const permissionChecker = require("../helpers/permissionChecker");
const { GroupSetStudentValidation } = require("../modules/validations");

module.exports = class GroupStudentController {
    static async GroupSetStudentPostController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "teacher", "operator"],
                req.user_permissions,
                res.error
            );

            const data = await GroupSetStudentValidation(req.body, res.error);

            const applicant = await req.db.applicants.findOne({
                where: {
                    applicant_id: data.applicant_id,
                },
                raw: true,
            });

            if (!applicant) throw new res.error(404, "Applicant not found");

            const group = await req.db.groups.findOne({
                where: {
                    group_id: data.group_id,
                },
                raw: true,
            });

            if (!group) throw new res.error(404, "Group not found");

            const group_students = await req.db.group_students.create({
                group_id: data.group_id,
                applicant_id: data.applicant_id,
            });

            res.status(201).json({
                ok: true,
                message: "Student created successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    static async GroupStudentsGetAllController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "teacher", "operator"],
                req.user_permissions,
                res.error
            );

            const limit = req.query.limit || 15;
            const page = req.query.page - 1 || 0;
            const oreder = req.query.oreder === "DESC" ? "DESC" : "ASC";

            const group_students = await req.db.group_students.findAll({
                raw: true,
                limit,
                offset: page * limit,
                order: [["createdAt", oreder]],
            });

            res.status(200).json({
                ok: true,
                message: "Students list",
                data: {
                    group_students,
                },
            });
        } catch (error) {
            next(error);
        }
    }
};
