const CustomError = require("../helpers/customError");

module.exports = function customErrorMiddleware(req, res, next) {
    req.error = CustomError;
    next();
};
