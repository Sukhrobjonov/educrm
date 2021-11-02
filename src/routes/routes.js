const errorHandler = require("../helpers/errorHandler");
const TeacherRoute = require("./teachers/TeacherRoute");
const UserRoute = require("./users/UserRoute");

module.exports = (app) => {
    try {
        app.use(UserRoute.path, UserRoute.router);
        app.use(TeacherRoute.path, TeacherRoute.router);
    } finally {
        app.use(errorHandler);
    }
};
