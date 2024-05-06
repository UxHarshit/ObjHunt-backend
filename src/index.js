import express from "express";
import http from "http";
import RoomRouter from "./routes/room.js";
import { initializeSocket } from "./socket/socket.js";
import dotenv from 'dotenv';
dotenv.config({path: "./.env"});


const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 6969;

app.use("/room", RoomRouter);

httpServer.listen(port, () => console.log(`server listening on port ${port}`));

initializeSocket(httpServer);
