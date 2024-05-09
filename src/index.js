//Importing packgages
import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//Importing functions
import RoomRouter from "./routes/room.js";
import { initializeSocket } from "./socket/socket.js";

//Setting up server
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 6969;

//Routes
app.use("/room", RoomRouter);

//Starting server
httpServer.listen(port, () => console.log(`server listening on port ${port}`));

initializeSocket(httpServer); //Starting socket.io
