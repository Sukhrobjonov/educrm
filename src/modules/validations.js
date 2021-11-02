const joi = require("joi");

module.exports = class Validations {
    static async SignUpValidation(data, error) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(5)
                    .max(64)
                    .required()
                    .error(new error(400, "Name is invalid")),
                username: joi
                    .string()
                    .max(32)
                    .regex(/^[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/)
                    .required()
                    .error(new error(400, "Username is invalid")),
                gender: joi
                    .string()
                    .valid("male", "female")
                    .required()
                    .error(new error(400, "This option isn't available")),
                password: joi
                    .string()
                    .min(5)
                    .max(128)
                    .required()
                    .error(new error(400, "Password is invalid")),
            })
            .validateAsync(data);
    }

    static async SignInValidation(data, error) {
        return await joi
            .object({
                username: joi
                    .string()
                    .regex(/^[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/)
                    .required()
                    .error(new error(400, "Username is invalid")),
                password: joi
                    .string()
                    .min(5)
                    .max(128)
                    .required()
                    .error(new error(400, "Password is invalid")),
            })
            .validateAsync(data);
    }
};
