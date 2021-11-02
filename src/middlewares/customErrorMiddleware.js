const CustomError = require("../helpers/CustomError");

module.exports = function customErrorMiddleware(req, res, next) {
    req.error = CustomError;
    next(err);
};
