const { genHash, compareHash } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const { SignInValidation } = require("../modules/validations");

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

            let token = await createToken({
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
            //
        } catch (error) {
            next(error);
        }
    }
};
