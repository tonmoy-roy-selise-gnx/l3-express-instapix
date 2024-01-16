import mongoose from "mongoose";
import app from "./app"
import config from "../config";

const port: number = 5000;

//run server
async function databaseConnection() {
    try {
        // database connection
        await mongoose.connect(config.mongoDBConnectionURL);
        console.log("database connect successfully");

        // run application
        app.listen(port, () => {
            console.log(`Server is listening on port ${port} \nopen with http://localhost:5000/ or http://127.0.0.1:5000/`)
        })
    } catch (error) {
        console.log("not possible to connect");
        console.error(error);
    }
}
databaseConnection();
