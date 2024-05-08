import { Server } from "socket.io";
import {
  rooms,
  assignNewRoom,
  assignRoom,
  addPlayer,
  removePlayer,
  assignPoints,
  generateLeaderboard,
  GetRoomDetails,
  updateSubmitted,
} from "../utils/roomManager.js";
import { checkImage } from "../utils/imageManager.js";
import { startGame } from "../utils/gameManager.js";

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
      // console.log("creating room");
      if (!username) {
        // console.log("no username/id");
        io.to(socket.id).emit("error", "Please send username");
      } else {
        user = username;
        // console.log("user is here", user);
        room = assignNewRoom();
        if (room !== undefined) {
          // console.log("room assigned");
          socket.join(room);
          let addedPlayer = addPlayer(user, socket.id, room);
          if (addedPlayer === 0) {
            io.to(socket.id).emit("error", `You've already joined the room!`);
          } else {
            io.to(room).emit("newplayer", `${user} joined the room!`);
            io.to(room).emit("leaderboard", generateLeaderboard(room));
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
      // console.log("joining random room");
      if (!username) {
        // console.log("no username/id");
        io.to(socket.id).emit("error", "Please send username");
      } else {
        user = username;
        // console.log("user is here", user);
        room = assignRoom();
        // console.log(room)
        if (room !== undefined) {
          // console.log("room assigned");
          socket.join(room);
          let addedPlayer = addPlayer(user, socket.id, room);
          const gamestatus =startGame(room, io);
          
          
          if (addedPlayer === 0) {
            io.to(socket.id).emit("error", `You've already joined the room!`);
          } else {
            io.to(room).emit("newplayer", `${user} joined the room!`);
          }
          // console.log(rooms);
          io.to(room).emit("leaderboard", generateLeaderboard(room));
        }
      }
    });
    socket.on("requestLeaderboard", (roomId) => {
      // console.log(`${socket.id} requested leaderboard for room ${roomId}`);
      const room = rooms.find((r) => r.id === roomId);
      if (!room) {
        io.to(socket.id).emit("message", `Room ${roomId} not found`);
        return;
      }
      // Example usage of modifyPoints function

      const leaderboard = generateLeaderboard(roomId);
      io.to(room).emit("leaderboard", leaderboard);
    });

    socket.on("upload", (data) => {
      if (
        typeof data !== "object" &&
        data.hasOwnProperty("filename", "image") &&
        user &&
        room
      ) {
        io.to(socket.id).emit("error", "Data recieved in wrong format.");
      } else {
        // console.log("got an image");
        const currentRoom = GetRoomDetails(room);
        const currentPlayer = currentRoom.players.find(
          (player) => player.id === socket.id
        );
        if (!currentPlayer) {
          io.to(socket.id).emit("error", "user not found");
        } else {
          if (currentPlayer.hasSubmitted) {
            io.to(socket.id).emit("error", "Already submitted");
          } else {
            const base64Data = data.image.replace(
              /^data:image\/\w+;base64,/,
              ""
            );
            const buffer = Buffer.from(base64Data, "base64");
            const filename = Date.now() + "-" + data.filename;
            const isCorrectObject = checkImage(filename, buffer, "bottle");
            const playersSubmitted = currentRoom.players.filter((e) => e.isCorrect);

            const pointsAssigned = assignPoints(
              room,
              socket.id,
              playersSubmitted,
              isCorrectObject
            );
            updateSubmitted(socket.id, room);
            if (!pointsAssigned) {
              io.to(socket.id).emit("error", "Points not assigned");
            }
            io.to(room).emit("leaderboard", generateLeaderboard(room));
            // console.log(isCorrectObject);
          }
        }
      }
    });
    socket.on("disconnect", () => {
      console.log(`${socket.id} is gone`);
      if (room !== undefined) {
        removePlayer(socket.id, room);
        startGame(room);
        io.to(room).emit("message", `${user} left the room`);
        io.to(room).emit("leaderboard", generateLeaderboard(room));
      }
    });
  });
}
