import {resetStats, rooms, setPlaying, setRound } from "./roomManager.js";
const OBJECTS = ["bottle", "remote", "bat", "object4"];

const startGame = (roomId, io) => {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    return 0;
  }
  if (room.isPlaying) {
    return 0;
  }
  if (room.players.length < 2) {
    return 0;
  }
  if (room.round >= process.send.ROUNDS) {
    return 0;
  }
  room.current_obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];

  setPlaying(roomId, true);

  const a = () => {
    const nroom = rooms.find((room) => room.id === roomId);
    console.log("nroom", nroom);
    if (nroom.round >= process.env.ROUNDS) {
      console.log("matchend");
      setRound(roomId, 0);
      resetStats(roomId);
      io.to(roomId).emit("game", { msg: "Match ended" });
    } else {
      setTimeout(() => {
        setRound(roomId, nroom.round + 1);
        resetStats(roomId);

        setTimeout(() => {
          setPlaying(roomId, false);
          io.to(roomId).emit("game", { msg: "round ended" });
          a();
        }, process.env.ROUND_TIME);

        io.to(roomId).emit("game", {
          msg: "round started",
          object: room.current_obj,
        });
      }, 5000);
      io.to(roomId).emit("game", { msg: "starting game in 5sec" });
    }
  };

  a();
  console.log(room.current_obj);
};

export { startGame };
