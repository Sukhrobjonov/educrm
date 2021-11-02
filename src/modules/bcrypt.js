const { hashSync, genSaltSync, compareSync } = require("bcrypt");

module.exports.genHash = function (password) {
    return hashSync(password, genSaltSync(10));
};

module.exports.compareHash = function (password, hash) {
    return compareSync(password, hash);
};
