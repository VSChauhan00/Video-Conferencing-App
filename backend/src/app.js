import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
dotenv.config();


import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000));
const uri = process.env.BACKEND_MONGO_URL;
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.get("/home", (req, res)=> {
    return res.json({"hello": "world"})
});

const start = async () => {
    const connectionDb = await mongoose.connect(uri);

    console.log(`Database Connected: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Listening On Port 8000")
    });
}

start();