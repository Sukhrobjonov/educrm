const express = require("express");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const customErrorMiddleware = require("./middlewares/customErrorMiddleware");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const postgres = require("./modules/pg/postgres");
const path = require("path");
const routes = require("./routes/routes");
const app = express();

async function server(mode) {
    try {
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT} port`);
        });

        const db = await postgres();
        await databaseMiddleware(db, app);
        app.use(customErrorMiddleware);

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(express.static(path.join(__dirname, "public")));

        if (mode == "dev") app.use(morgan("dev"));
    } catch (error) {
        console.log(`SERVER ERROR: ${error}`);
    } finally {
        routes(app);
    }
}

module.exports = server;
