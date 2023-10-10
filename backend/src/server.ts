import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/validateEnv";
import app from "./app";



const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server port is listening on: " + port);
        })
    })
    .catch(console.error);

