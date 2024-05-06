import { rooms } from "./roomManager.js";
const OBJECTS = ["bottle", "remote", "bat", "object4"];
const ROUND_TIME = process.env.ROUND_TIME;

const startGame = (roomId) => {
  console.log("started game");
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    console.log("one")
    return 0;
  }
  if (room.isPlaying) {
    console.log("two")

    return 0;
  }
  if (room.players.length < 2) {
    console.log("three")

    return 0;
  }
  room.isPlaying = true;
  room.current_obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];

  setTimeout(() => {
    room.isPlaying = false;
  }, ROUND_TIME);
  
  console.log(room.current_obj);
  return room.current_obj;
};

export { startGame };
