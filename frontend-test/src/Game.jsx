import React from 'react'
// import { useSocket } from './context/SocketContext';

const Game = () => {
  const [message, setMessage] = useState([]);
  // const socket = useSocket();
  // useEffect(() => {
  //   socket.on('newplayer', (e) => {
  //     console.log(e)
  //     setMessage(prevMessage => [...prevMessage, e])
  //   })
  //   socket.on('message', (e) => {
  //     console.log(e)
  //     setMessage(prevMessage => [...prevMessage, e])
  //   })
  //   socket.on("error", (msg) => {
  //     alert(msg)
  //   })
  // }, [])

  return (
    <div>
      <div>{message.map((e) => <h6 id='e'>{e}</h6>)}</div>
    </div>
  )
}

export default Game
