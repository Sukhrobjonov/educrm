module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("group_students", {
        group_student_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    });
};
