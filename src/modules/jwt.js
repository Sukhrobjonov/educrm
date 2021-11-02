const { verify, sign } = require("jsonwebtoken");

module.exports.createToken = function (data) {
    return sign(data, process.env.JWT_SECRET);
};

module.exports.checkToken = function (token) {
    return verify(token, process.env.JWT_SECRET);
};
