const permissionChecker = require("../helpers/permissionChecker");
const {
    AddApplicantValidation,
    UpdateApplicantValidation,
} = require("../modules/validations");

module.exports = class ApplicantController {
    static async ApplicantGetController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const limit = req.query.limit || 15;
            const page = req.query.page - 1 || 0;
            const oreder = req.query.oreder === "DESC" ? "DESC" : "ASC";

            const applicants = await req.db.applicants.findAll({
                raw: true,
                limit,
                offset: page * limit,
                order: [["createdAt", oreder]],
                include: [
                    {
                        model: req.db.users,
                        attributes: { exclude: ["user_password"] },
                    },
                    {
                        model: req.db.courses,
                    },
                ],
            });

            res.status(200).json({
                ok: true,
                message: "Applicants list",
                data: {
                    applicants:
                        applicants.length === 0
                            ? "Applicants is not available"
                            : applicants,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    static async ApplicantPostController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const course_id = req.params.course_id;

            const course = await req.db.courses.findOne({
                where: { course_id },
                raw: true,
            });

            if (!course) throw new res.error(404, "Course is not found");

            const data = await AddApplicantValidation(req.body, res.error);

            const applicant = await req.db.applicants.create({
                course_id,
                user_id: req.sessions.user_id,
                applicant_name: data.name,
                applicant_description: data.description,
                applicant_source: data.source,
                applicant_birth_date: data.birth_date,
                applicant_phone: data.phone,
                applicant_gender: data.gender,
                applicant_status: "waiting",
            });

            res.status(201).json({
                ok: true,
                message: "Applicant created successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    static async ApplicantUpdatePutController(req, res, next) {
        try {
            permissionChecker(
                ["admin", "operator"],
                req.user_permissions,
                res.error
            );

            const applicant_id = req.params.applicant_id;

            const applicant = await req.db.applicants.findOne({
                where: { applicant_id },
                raw: true,
            });

            if (!applicant) throw new res.error(404, "Applicant is not found");

            const data = await UpdateApplicantValidation(req.body, res.error);

            await req.db.applicants.update(
                {
                    applicant_name: data.name,
                    applicant_description: data.description,
                    applicant_source: data.source,
                    applicant_birth_date: data.birth_date,
                    applicant_phone: data.phone,
                    applicant_gender: data.gender,
                    applicant_status: data.status,
                },
                {
                    where: { applicant_id },
                }
            );

            res.status(200).json({
                ok: true,
                message: "Applicant updated successfully",
            });
        } catch (error) {
            next(error);
        }
    }
};
