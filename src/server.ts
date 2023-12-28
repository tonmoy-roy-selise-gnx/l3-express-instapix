import mongoose from "mongoose";
import app from "./app"

const port: number = 5000;

// database connection
async function databaseConnection() {
    try {
        //await mongoose.connect('mongodb://127.0.0.1:27017/6429FC51-C9A3-4B46-9E5C-DD4DB5A57867');
        await mongoose.connect('mongodb://selise_dev:4rfvVFR$@10.5.25.13:27017/6429FC51-C9A3-4B46-9E5C-DD4DB5A57867?authSource=admin&authMechanism=SCRAM-SHA-1');
        //await mongoose.connect('mongodb+srv://amin:0123@cluster0.yz2oh.mongodb.net/insta_clone?retryWrites=true&w=majority');
        console.log("database connect successfully");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port} \nopen with http://localhost:5000/ or http://127.0.0.1:5000/`)
        })
    } catch (error) {
        console.log("not possible to connect");
        console.error(error);
    }
}
databaseConnection();
