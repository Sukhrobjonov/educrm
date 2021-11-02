const permissionChecker = require("../helpers/permissionChecker");
const permissionMiddleware = require("../middlewares/permissionMiddleware");
const { genHash, compareHash } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const {
    SignInValidation,
    SignUpValidation,
} = require("../modules/validations");

module.exports = class UserController {
    static async SignInPostController(req, res, next) {
        try {
            const { username, password } = await SignInValidation(
                req.body,
                res.error
            );

            const user = await req.db.users.findOne({
                where: { user_username: username },
                raw: true,
            });

            if (!user) throw new res.error(404, "User not found");

            const isTrust = await compareHash(password, user.user_password);

            if (!isTrust) throw new res.error(400, "Password is invalid");

            await req.db.sessions.destroy({
                where: {
                    session_useragent: req.headers["user-agent"] || "Unknown",
                    user_id: user.user_id,
                },
            });

            const session = await req.db.sessions.create({
                session_useragent: req.headers["user-agent"] || "Unknown",
                user_id: user.user_id,
            });

            const token = await createToken({
                session_id: session.session_id,
            });

            res.status(201).json({
                ok: true,
                message: "Token created successfully",
                data: {
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    static async CreateUserPostController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const data = await SignUpValidation(req.body, res.error);

            const user = await req.db.users.create({
                user_name: data.name,
                user_username: data.username,
                user_gender: data.gender,
                user_password: await genHash(data.password),
            });

            res.status(201).json({
                ok: true,
                message: "User created successfully",
            });
        } catch (error) {
            if (error.message === "Validation error") {
                error.code == 400;
                error.message = "Username already exists";
            }
            next(error);
        }
    }

    static async UserGetController(req, res, next) {
        try {
            permissionChecker("admin", req.user_permissions, res.error);

            const page = req.query.page ? req.query.page - 1 : 0;
            const limit = req.query.limit || 15;
            const order = req.query.order == "DESC" ? "DESC" : "ASC";

            const users = await req.db.users.findAll({
                attributes: [
                    "user_id",
                    "user_name",
                    "user_username",
                    "user_gender",
                ],
                raw: true,
                limit: limit,
                offset: page * 15,
                order: [["createdAt", order]],
            });

            res.status(200).json({
                ok: true,
                message: "Users list",
                data: {
                    users,
                },
            });
        } catch (error) {
            next(error);
        }
    }
};
