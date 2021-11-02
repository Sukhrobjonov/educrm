const express = require("express");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const postgres = require("./modules/pg/postgres");
const app = express();

async function server(mode) {
    try {
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT} port`);
        });
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        const db = await postgres();

        await databaseMiddleware(db, app);

        // console.log(db);

        if (mode == "dev") app.use(morgan("dev"));
    } catch (error) {
        console.log(`SERVER ERROR: ${error}`);
    } finally {
        //
    }
}

module.exports = server;
