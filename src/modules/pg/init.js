const { genHash } = require("../bcrypt");

module.exports = async function init(db) {
    const count = await db.users.count();

    if (count === 0) {
        const admin = await db.users.create({
            user_name: "admin",
            user_username: "admin",
            user_gender: "male",
            user_password: await genHash("admin"),
        });
    }
};
