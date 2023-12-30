import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

const config = {
    mongoDBConnectionURL: process.env.MongoDBConnectionURL as string,
}

export default config;