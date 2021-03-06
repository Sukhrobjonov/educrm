module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("applicants", {
        applicant_id: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        applicant_name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        applicant_birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        applicant_gender: {
            type: Sequelize.ENUM,
            values: ["male", "female"],
            allowNull: false,
        },
        applicant_source: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        applicant_phone: {
            type: Sequelize.STRING(13),
            allowNull: false,
        },
        applicant_description: {
            type: Sequelize.TEXT(),
            allowNull: true,
        },
        applicant_status: {
            type: Sequelize.ENUM,
            values: ["waiting", "active", "cancelled"],
            allowNull: false,
        },
    });
};
