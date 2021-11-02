const errorHandler = require("../helpers/errorHandler");
const UserRoute = require("./users/UserRoute");

module.exports = (app) => {
    try {
        app.use(UserRoute.path, UserRoute.router);
    } finally {
        app.use(errorHandler);
    }
};
