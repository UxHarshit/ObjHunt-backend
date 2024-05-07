import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from './context/SocketContext';

const Game = () => {
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('newplayer', (e) => {
      console.log(e);
      setMessage(prevMessage => [...prevMessage, e]);
    });

    socket.on('message', (e) => {
      console.log(e);
      setMessage(prevMessage => [...prevMessage, e]);
    });

    socket.on("leaderboard", (data) => {
      setLeaderboard(data);
    });

    socket.on("error", (msg) => {
      alert(msg);
    });

    socket.on("game", (msg)=>{
      alert(msg);
      console.log("game", msg)
    })

    // Clean up function to remove event listeners when component unmounts
    return () => {
      socket.off('newplayer');
      socket.off('message');
      socket.off('leaderboard');
      socket.off('error');
    }
  }, [socket]);

  function handleChat(e) {
    setChat(e.target.value);
  }

  function handleSend(e) {
    console.log(chat);
    socket.emit("message", chat);
    setChat("");
  }

  const imgRef = useRef();

  function sendImage(e) {
    let file = imgRef.current.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = e.target.result;

        const imageData = {
          image: image,
          filename: file.name
        };

        socket.emit('upload', imageData);
      }
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image.');
    }

  }

  return (
    <div>
      <div className='border p-3 max-h-96 overflow-auto'>
        {message.map((e, index) => (
          <h6 key={index}>{e}</h6>
        ))}
      </div>
      <div className='border p-3 mt-4'>
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index}>
                <td>{player.username}</td>
                <td>{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type="file" accept='image/*' ref={imgRef} />
      <button onClick={sendImage}>SendImage</button>
      <div className='absolute bottom-10 mx-auto'>
        <input type="text" placeholder='Chat here' value={chat} onChange={handleChat} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Game;
