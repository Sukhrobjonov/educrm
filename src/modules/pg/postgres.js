const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL);

module.exports = async function postgres() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(`DATABASE ERROR: ${error}`);
    }
};
