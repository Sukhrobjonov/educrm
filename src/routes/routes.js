const errorHandler = require("../helpers/errorHandler");
const ApplicantRoute = require("./applicants/ApplicantRoute");
const CourseRoute = require("./courses/CourseRoute");
const GroupRoute = require("./groups/GroupRoute");
const GroupStudentRoute = require("./grup_students/GroupStudentRoute");
const TeacherRoute = require("./teachers/TeacherRoute");
const UserRoute = require("./users/UserRoute");

module.exports = (app) => {
    try {
        app.use(UserRoute.path, UserRoute.router);
        app.use(TeacherRoute.path, TeacherRoute.router);
        app.use(CourseRoute.path, CourseRoute.router);
        app.use(ApplicantRoute.path, ApplicantRoute.router);
        app.use(GroupRoute.path, GroupRoute.router);
        app.use(GroupStudentRoute.path, GroupStudentRoute.router);
    } finally {
        app.use(errorHandler);
    }
};
