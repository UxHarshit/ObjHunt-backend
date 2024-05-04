import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { connect, io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState("");
  const socket = useMemo(() => io("http://localhost:6969"), [])

  function handleClick(e) {
    e.preventDefault();
    socket.emit("createRoom", { username: user })
    setUser("");
  }

  useEffect(() => {
    socket.on('newplayer', (e) => {
      console.log(e)
      setMessage(prevMessage => [...prevMessage, e])
    })
    socket.on('message', (e) => {
      console.log(e)
      setMessage(prevMessage => [...prevMessage, e])
    })
    socket.on("error", (msg)=>{
      alert(msg)
    })


    return () => {
      socket.disconnect()
    }
  }, [])

  function handleChange(e) {
    e.preventDefault();
    setUser(e.target.value);
    console.log(user)
  }

  function handleRandom(e) {
    e.preventDefault();
    socket.emit("joinRandom", { username: user })
  }

  return (
    <>
      <input type="text" name="" placeholder='username' onChange={handleChange} value={user} id="" />
      <button onClick={handleRandom}>Join Random</button>
      <button onClick={handleClick}>Create Room</button>
      <div>{message.map((e) => <h6 id='e'>{e}</h6>)}</div>
    </>
  )
}

export default App
