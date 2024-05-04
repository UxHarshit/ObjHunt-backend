import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Game from './Game.jsx'
import './index.css'
import SocketProvider from './context/SocketContext.jsx'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <SocketProvider>
            <Routes>
            <Route exact path='/' element={<App/>} />
            <Route exact path='/game' element={<Game/>} />
            </Routes>
        </SocketProvider>
    </Router>
)
