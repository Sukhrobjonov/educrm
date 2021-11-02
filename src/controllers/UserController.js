module.exports = class UserController {
    static async SignInPostController(req, res, next) {
        try {
            console.log(req.body);
        } catch (error) {
            next(error);
        }
    }
};
