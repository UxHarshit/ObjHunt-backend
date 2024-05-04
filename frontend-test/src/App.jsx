import { useEffect, useState } from 'react'
import './App.css'
import { useSocket } from './context/SocketContext';
import { useNavigate, Link } from 'react-router-dom'

function App() {
  const [message, setMessage] = useState([]);
  const [user, setUser] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();


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
    socket.on("error", (msg) => {
      alert(msg)
    })

  }, [])

  function handleChange(e) {
    e.preventDefault();
    setUser(e.target.value);
  }

  function handleRandom(e) {
    e.preventDefault();
    socket.emit("joinRandom", { username: user })
    navigate('/game')
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
