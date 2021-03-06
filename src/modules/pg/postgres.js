const { Sequelize } = require("sequelize");
const ApplicantModel = require("../../models/ApplicantModel");
const CourseModel = require("../../models/CourseModel");
const GroupModel = require("../../models/GroupModel");
const GroupStudentModel = require("../../models/GroupStudentModel");
const PermissionModel = require("../../models/PermissionModel");
const SessionModel = require("../../models/SessionModel");
const TeacherModel = require("../../models/TeacherModel");
const UserModel = require("../../models/UserModel");
const UserPermission = require("../../models/UserPermission");
const init = require("./init");
const relations = require("./relations");

const sequelize = new Sequelize(process.env.DB_URL, {
    logging: false,
});

module.exports = async function postgres() {
    try {
        await sequelize.authenticate();

        const db = {};

        db.users = await UserModel(sequelize, Sequelize);
        db.sessions = await SessionModel(sequelize, Sequelize);
        db.permissions = await PermissionModel(sequelize, Sequelize);
        db.user_permissions = await UserPermission(sequelize, Sequelize);
        db.teachers = await TeacherModel(sequelize, Sequelize);
        db.courses = await CourseModel(sequelize, Sequelize);
        db.applicants = await ApplicantModel(sequelize, Sequelize);
        db.groups = await GroupModel(sequelize, Sequelize);
        db.group_students = await GroupStudentModel(sequelize, Sequelize);

        await relations(db);

        // await db.applicants.sync({ force: true });
        await init(db);

        await sequelize.sync({ force: false });

        return db;
    } catch (error) {
        console.log(`DATABASE ERROR: ${error}`);
    }
};
