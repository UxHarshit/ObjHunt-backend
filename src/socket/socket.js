import { Server } from "socket.io";
import {
  addPlayer,
  assignNewRoom,
  assignRoom,
  removePlayer,
  modifyPoints,
  generateLeaderboard,
  rooms,
} from "../utils/roomManager.js";

export function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      allowedHeaders: ["*"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} is here`);
    let user;
    let room;
    socket.on("createRoom", ({ username }) => {
      console.log("creating room");
      if (!username) {
        console.log("no username/id");
        io.to(socket.id).emit("error", "Please send username");
      } else {
        user = username;
        console.log("user is here", user);
        room = assignNewRoom();
        if (room !== undefined) {
          console.log("room assigned");
          socket.join(room);
          let addedPlayer = addPlayer(user, socket.id, room);
          if (addedPlayer === 0) {
            io.to(socket.id).emit("error", `You've already joined the room!`);
          } else {
            io.to(room).emit("newplayer", `${user} joined the room!`);
          }
        }
      }
    });

    socket.on("message", (e) => {
      if (room === undefined || user === undefined) {
        io.to(socket.id).emit("error", "no username or user didnt join a room");
      } else {
        io.to(room).emit("message", user + ": " + e);
      }
    });

    socket.on("joinRandom", ({ username }) => {
      console.log("joining random room");
      if (!username) {
        console.log("no username/id");
        io.to(socket.id).emit("error", "Please send username");
      } else {
        user = username;
        console.log("user is here", user);
        room = assignRoom();
        if (room !== undefined) {
          console.log("room assigned");
          socket.join(room);
          let addedPlayer = addPlayer(user, socket.id, room);
          if (addedPlayer === 0) {
            io.to(socket.id).emit("error", `You've already joined the room!`);
          } else {
            io.to(room).emit("newplayer", `${user} joined the room!`);
          }
          console.log(rooms);
        }
      }
    });
    socket.on("requestLeaderboard", (roomId) => {
      console.log(`${socket.id} requested leaderboard for room ${roomId}`);
      const room = rooms.find((r) => r.id === roomId);
      if (!room) {
        io.to(socket.id).emit("message", `Room ${roomId} not found`);
        return;
      }
      // Example usage of modifyPoints function
      modifyPoints(roomId, {
        shubhankar: 10, // Add 10 points to player "shubhankar"
        Rahul: -5, // Deduct 5 points from player "Rahul"
        Shri: 20, // Add 20 points to player "Shri"
      });
      const leaderboard = generateLeaderboard(roomId);
      io.to(socket.id).emit("leaderboard", leaderboard);
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} is gone`);
      if (room !== undefined) {
        removePlayer(socket.id, room);
        io.to(room).emit("message", `${user} left the room`);
      }
    });
  });
}
