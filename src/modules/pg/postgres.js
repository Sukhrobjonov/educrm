const { Sequelize } = require("sequelize");
const SessionModel = require("../../models/SessionModel");
const UserModel = require("../../models/UserModel");
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

        relations(db);

        return db;
    } catch (error) {
        console.log(`DATABASE ERROR: ${error}`);
    }
};
