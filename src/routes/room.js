import express from "express";
import { rooms } from "../utils/roomManager.js";

const Router = express.Router();

Router.get('/test', (_, res)=>{
    res.send("hi")
})

Router.get("/checkRoom/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  if (roomId === undefined) {
      return res.json({ success: false, msg: "room not found" }).status(200);
    }
    
    const room = rooms.find((data)=> data.id == roomId)
  if(room===undefined){
    return res.json({ success: false, msg: "room not found" }).status(200);
  }
  res.json({success: true, msg: "room found!"})
});

export default Router;
