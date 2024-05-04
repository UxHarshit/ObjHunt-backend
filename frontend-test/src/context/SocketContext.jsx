import React, { createContext, useContext, useMemo } from 'react';
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:6969"), [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export default SocketProvider
export { useSocket }