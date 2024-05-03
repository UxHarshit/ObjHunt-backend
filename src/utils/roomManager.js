const rooms = [];
const MAX_ROOMS = 10;
const MAX_PLAYERS= 3

for (let i = 0; i < MAX_ROOMS; i++) {
  rooms.push({
    id: i,
    players: [],
    current_obj: "",
  });
}

function assignNewRoom() {
  console.log(rooms)
  let availableRooms = rooms.filter((val, ind) => val.players.length === 0);
  if (availableRooms.length === 0) {
    return undefined;
  } else {
    return availableRooms[0].id;
  }
}

function assignRoom() {
  console.log(rooms)
  let availableRooms = rooms.filter((val, ind) => val.players.length < MAX_PLAYERS);
  if (availableRooms.length === 0) {
    return undefined;
  } else {
    return availableRooms[0].id;
  }
}

function addPlayer(username, roomId) {
  for (let room = 0; room < rooms.length; room++) {
    if (rooms[room].id == roomId) {
      rooms[room].players.push(username);
      console.log(rooms[room])
      break
    }
  }
}

function removePlayer(username, roomId) {
  for (let room = 0; room < rooms.length; room++) {
    if (rooms[room].id == roomId) {
      const index = rooms[room].players.findIndex(player => player === username)
      if (index!=-1) {
        rooms.splice(index, 1);
        console.log(object)
      }
      break
    }
  }
}

export { rooms, assignNewRoom, assignRoom, addPlayer, removePlayer };
