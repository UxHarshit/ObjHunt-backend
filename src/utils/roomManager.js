const rooms = [];
import dotenv from 'dotenv';
dotenv.config({path: "./.env"});

for (let i = 0; i < process.env.MAX_ROOMS; i++) {
  rooms.push({
    id: i,
    players: [],
    current_obj: "",
    isPlaying: false,
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
    (val, ind) => val.players.length < process.env.MAX_PLAYERS
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
  return rooms[room];
}

const assignPoints = (roomId, userId, playersArray, isCorrectObject) => {
  const room = rooms.find((room) => room.id === roomId);
  if (!room) {
    return 0;
  }
  const playerInd = rooms[room].find((player) => player.id === userId);
  if (!playerInd) {
    return 0;
  }
  if (!isCorrectObject) {
    return 1;
  }

  const point = process.env.MAX_PLAYERS - playersArray.length;
  rooms[room].players[playerInd].points += point;

  return 1;
};

export {
  rooms,
  assignNewRoom,
  assignRoom,
  addPlayer,
  removePlayer,
  generateLeaderboard,
  GetRoomDetails,
  assignPoints
};
