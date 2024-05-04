import React, { useEffect, useState } from 'react'
import { useSocket } from './context/SocketContext';

const Game = () => {
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState("");
  const socket = useSocket();
  useEffect(() => {
    socket.on('newplayer', (e) => {
      console.log(e)
      setMessage(prevMessage => [...prevMessage, e])
    })
    socket.on('message', (e) => {
      console.log(e)
      setMessage(prevMessage => [...prevMessage, e])
    })
    socket.on("error", (msg) => {
      alert(msg)
    })
  }, [])

  function handleChat (e){
    setChat(e.target.value);
  }

  function handleSend(e) {
    console.log(chat);
    socket.emit("message", chat)
    setChat("");
  }

  return (
    <div>
      <div className='border p-3 max-h-96 overflow-auto'>{message.map((e) => <h6 id='e'>{e}</h6>)}</div>
      <div className='absolute bottom-10 mx-auto'>
        <input type="text" placeholder='Chat here' value={chat} onChange={handleChat} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Game
