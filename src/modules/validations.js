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
                    .lowercase()
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
                    .lowercase()
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

    static async AddTeacherValidation(data, error) {
        return await joi
            .object({
                user_id: joi
                    .string()
                    .uuid()
                    .required()
                    .error(new error(400, "User id is invalid")),
                phone: joi
                    .string()
                    .required()
                    .regex(/^\+998(9[01345789]|3[3]|7[018])[0-9]{7}$/)
                    .error(new error(400, "Phone number is invalid")),
                skills: joi
                    .array()
                    .items(joi.string().min(2).max(32))
                    .required()
                    .error(new error(400, "Skills are invalid")),
            })
            .validateAsync(data);
    }

    static async CourseCreateValidation(data, error) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(8)
                    .max(128)
                    .error(new error(400, "Name id is invalid")),
                description: joi
                    .string()
                    .required()
                    .min(64)
                    .error(new error(400, "Description is invalid")),
                price: joi
                    .number()
                    .min(0)
                    .required()
                    .error(new error(400, "Price is invalid")),
            })
            .validateAsync(data);
    }

    static async AddApplicantValidation(data, error) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(8)
                    .max(64)
                    .required()
                    .error(new error(400, "Name id is invalid")),
                description: joi
                    .string()
                    .error(new error(400, "description id is invalid")),
                birth_date: joi
                    .date()
                    .required()
                    .error(new error(400, "Date is invalid")),
                phone: joi
                    .string()
                    .required()
                    .regex(/^\+998(9[01345789]|3[3]|7[018])[0-9]{7}$/)
                    .error(new error(400, "Phone number is invalid")),
                source: joi
                    .string()
                    .required()
                    .error(new error(400, "Source is invalid")),
                gender: joi
                    .string()
                    .valid("male", "female")
                    .required()
                    .error(new error(400, "This option isn't available")),
            })
            .validateAsync(data);
    }

    static async UpdateApplicantValidation(data, error) {
        return await joi
            .object({
                name: joi
                    .string()
                    .min(8)
                    .max(64)
                    .error(new error(400, "Name id is invalid")),
                description: joi
                    .string()
                    .error(new error(400, "description id is invalid")),
                birth_date: joi.date().error(new error(400, "Date is invalid")),
                phone: joi
                    .string()
                    .regex(/^\+998(9[01345789]|3[3]|7[018])[0-9]{7}$/)
                    .error(new error(400, "Phone number is invalid")),
                source: joi.string().error(new error(400, "Source is invalid")),
                gender: joi
                    .string()
                    .valid("male", "female")
                    .error(new error(400, "This option isn't available")),
                status: joi
                    .string()
                    .valid("waiting", "active", "cancelled")
                    .error(new error(400, "This option isn't available")),
            })
            .validateAsync(data);
    }

    static async GroupCreateValidation(data, error) {
        return await joi
            .object({
                time: joi
                    .string()
                    .min(5)
                    .max(5)
                    .required()
                    .error(new error(400, "Group time is invalid")),
                status: joi
                    .string()
                    .valid("waiting", "studying", "finished", "closed")
                    .required()
                    .error(new error(400, "Group status is invalid")),
                schedule: joi
                    .array()
                    .items(joi.string().min(2).max(32))
                    .required()
                    .error(new error(400, "Group schedules are invalid")),
                lesson_duration: joi
                    .number()
                    .min(0)
                    .required()
                    .error(new error(400, "Lesson duration is invalid")),
                course_duration: joi
                    .number()
                    .min(0)
                    .required()
                    .error(new error(400, "Course duration is invalid")),
                teacher_id: joi
                    .string()
                    .uuid()
                    .required()
                    .error(new error(400, "Teacher id is invalid")),
                course_id: joi
                    .string()
                    .uuid()
                    .required()
                    .error(new error(400, "Course id is invalid")),
            })
            .validateAsync(data);
    }
    static async GroupSetStudentValidation(data, error) {
        return await joi
            .object({
                applicant_id: joi
                    .string()
                    .uuid()
                    .required()
                    .error(new error(400, "Applicant id is invalid")),
                group_id: joi
                    .string()
                    .uuid()
                    .required()
                    .error(new error(400, "Group id is invalid")),
            })
            .validateAsync(data);
    }
};
