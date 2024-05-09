import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const rooms = [];
const OBJECTS = ["bottle", "remote", "bat", "object4"];

for (let i = 0; i < process.env.MAX_ROOMS; i++) {
  rooms.push({
    id: i,
    players: [],
    current_obj: "",
    isPlaying: false,
    round: 0,
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
    (room) => room.players.length < process.env.MAX_PLAYERS
  );
  if (availableRooms.length === 0) {
    return undefined;
  } else {
    return availableRooms[0].id;
  }
}

function addPlayer(user, socketId, roomId) {
  for (let room = 0; room < rooms.length; room++) {
    if (rooms[room].id == roomId) {
      // Loop to check if player is duplicate
      for (let i = 0; i < rooms[room].players.length; i++) {
        if (rooms[room].players[i].id === socketId) {
          return 0;
        }
      }
      const player = {
        id: socketId,
        username: user,
        points: 0,
        hasSubmitted: false,
        isCorrect: false,
      };
      rooms[room].players.push(player);
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
      break;
    }
  }
}
function generateLeaderboard(roomId) {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    return "Room not found";
  }

  const leaderboard = room.players.map((player) => ({
    username: player.username,
    points: player.points,
  }));

  // Sort leaderboard by points in descending order
  leaderboard.sort((a, b) => b.points - a.points);

  // Send the leaderboard data to the server
  sendLeaderboardToServer(roomId, leaderboard);

  return leaderboard;
}

function sendLeaderboardToServer(roomId, leaderboard) {
  // Simulate sending data to the server
}
// Example usage of modifyPoints function

function GetRoomDetails(roomId) {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) return 0;
  return room;
}

const assignPoints = (roomId, userId, playersArray, isCorrectObject) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  if (room === -1) {
    return 0;
  }
  const playerInd = rooms[room].players.findIndex(
    (player) => player.id === userId
  );
  if (playerInd === -1) {
    return 0;
  }
  if (!isCorrectObject) {
    return 1;
  }
  console.log(playersArray);
  const point = process.env.MAX_PLAYERS - playersArray.length;
  rooms[room].players[playerInd].points += point;
  rooms[room].players[playerInd].isCorrect = true;

  return 1;
};

function updateSubmitted(userId, roomId) {
  const room = rooms.findIndex((room) => room.id === roomId);
  if (room === -1) {
    return 0;
  }
  const playerInd = rooms[room].players.findIndex(
    (player) => player.id === userId
  );
  if (playerInd === -1) {
    return 0;
  }
  rooms[room].players[playerInd].hasSubmitted = true;
}

function setPlaying(roomId, val) {
  rooms.forEach((room, ind) => {
    if (room.id === roomId) {
      rooms[ind].isPlaying = val;
      console.log(rooms[ind]);
    }
  });
}

function setRound(roomId, round) {
  rooms.forEach((room, ind) => {
    if (room.id === roomId) {
      rooms[ind].round = round;
      console.log(rooms[ind]);
    }
  });
}

function resetStats(roomId) {
  rooms.forEach((room, ind) => {
    if (room.id === roomId) {
      rooms[ind].players.forEach((player, playerInd) => {
        rooms[ind].players[playerInd].hasSubmitted = false;
        rooms[ind].players[playerInd].isCorrect = false;
      });
    }
  });
}

function generateObject(roomId) {
  const roomInd = rooms.findIndex((room) => room.id == roomId);
  if (roomInd === -1) {
    return 0;
  }
  const randomObj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  rooms[roomInd].current_obj = randomObj;
  return randomObj;
}

export {
  rooms,
  assignNewRoom,
  assignRoom,
  addPlayer,
  removePlayer,
  generateLeaderboard,
  GetRoomDetails,
  assignPoints,
  updateSubmitted,
  setPlaying,
  setRound,
  resetStats,
  generateObject,
};
