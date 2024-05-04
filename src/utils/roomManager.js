const rooms = [];
const MAX_ROOMS = 10;
const MAX_PLAYERS = 3;

for (let i = 0; i < MAX_ROOMS; i++) {
  rooms.push({
    id: i,
    players: [],
    current_obj: "",
  });
}

function assignNewRoom() {
  let availableRooms = rooms.filter((val, ind) => val.players.length === 0);
  if (availableRooms.length === 0) {
    return undefined;
  } else {
    return availableRooms[0].id;
  }
}

function assignRoom() {
  let availableRooms = rooms.filter(
    (val, ind) => val.players.length < MAX_PLAYERS
  );
  if (availableRooms.length === 0) {
    return undefined;
  } else {
    return availableRooms[0].id;
  }
}

function addPlayer(username, socketId, roomId) {
  for (let room = 0; room < rooms.length; room++) {
    if (rooms[room].id == roomId) {
      //Loop to ckeck if player is duplicate
      for (let i = 0; i < rooms[room].players.length; i++) {
        if(rooms[room].players[i].id===socketId){
          console.log("duplicate user")
          return 0;
        }
      }
      const player = {
        id: socketId,
        user: username,
      };
      rooms[room].players.push(player);
      console.log(rooms[room]);
      break;
    }
  }
}

function removePlayer(socketId, roomId) {
  for (let room = 0; room < rooms.length; room++) {
    if (rooms[room].id == roomId) {
      const index = rooms[room].players.findIndex(
        (player) => player.id === socketId
      );
      if (index != -1) {
        rooms[room].players.splice(index, 1);
      }
      console.log(rooms);
      break;
    }
  }
}

export { rooms, assignNewRoom, assignRoom, addPlayer, removePlayer };
