import { rooms, setPlaying } from "./roomManager.js";
const OBJECTS = ["bottle", "remote", "bat", "object4"];

const startGame = (roomId, io) => {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    console.log("one");
    return 0;
  }
  if (room.isPlaying) {
    console.log("two");

    return 0;
  }
  if (room.players.length < 2) {
    console.log("three");
    return 0;
  }
  room.current_obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];

  setTimeout(() => {
    setPlaying(roomId, true)
    setTimeout(() => {
      setPlaying(roomId, false)
      io.to(roomId).emit("game", { msg: "game ended" });
    }, process.env.ROUND_TIME);
    io.to(roomId).emit("game", { msg: "game started", object: room.current_obj });
  }, 5000);

  io.to(roomId).emit("game", { msg: "starting game in 5sec" });
  console.log(room.current_obj);
};

export { startGame };
