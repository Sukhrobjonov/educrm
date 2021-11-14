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

    static async GroupUpdatePutController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "teacher", "operator"],
                req.user_permissions,
                res.error
            );

            const group_id = req.params.group_id;

            const group = await req.db.groups.findOne({
                where: {
                    group_id,
                },
                raw: true,
            });

            if (!group) throw new res.error(404, "Group not found");

            const data = await GroupCreateValidation(req.body, res.error);

            const course = await req.db.courses.findOne({
                where: {
                    course_id: data.course_id,
                },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course not found");

            const teacher = await req.db.teachers.findOne({
                where: {
                    teacher_id: data.teacher_id,
                },
                raw: true,
            });

            if (!teacher) throw new res.error(404, "Teacher not found");

            await req.db.groups.update(
                {
                    group_time: data.time,
                    group_status: data.status,
                    group_schedule: data.schedule,
                    group_lesson_duration: data.lesson_duration,
                    group_course_duration: data.course_duration,
                    teacher_id: data.teacher_id,
                    course_id: data.course_id,
                },
                {
                    where: {
                        group_id,
                    },
                }
            );

            res.status(200).json({
                ok: true,
                message: "Group updated successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    static async GroupGetOneController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "teacher", "operator"],
                req.user_permissions,
                res.error
            );

            const group_id = req.params.group_id;

            const group = await req.db.groups.findOne({
                where: {
                    group_id,
                },
                raw: true,
            });

            if (!group) throw new res.error(404, "Group not found");

            res.status(200).json({
                ok: true,
                message: "Group",
                data: {
                    group,
                },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async GroupGetAllController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "teacher", "operator"],
                req.user_permissions,
                res.error
            );

            const groups = await req.db.groups.findAll({
                raw: true,
            });

            res.status(200).json({
                ok: true,
                message: "Groups list",
                data: {
                    groups,
                },
            });
        } catch (error) {
            next(error);
        }
    }
};
