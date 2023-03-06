import mongoose from "mongoose";
import credentials from "../../credentials.js";

const databaseConnection = () => {
    mongoose
        .connect(
            `mongodb+srv://admin:${credentials.mongoPassword}@mainbase.bovmcii.mongodb.net/blog?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log("database is connected");
        })
        .catch((err) => {
            console.log(`database err: ${err.message}`);
        });
};
export default databaseConnection;
