const permissionChecker = require("../helpers/permissionChecker");

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
            });

            res.status(200).json({
                ok: true,
                message: "Applicants list",
                data: {
                    applicants:
                        applicants.length === 0
                            ? "No applicants available"
                            : applications,
                },
            });
        } catch (error) {
            next(error);
        }
    }
};
