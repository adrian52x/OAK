import dotenv from "dotenv";
dotenv.config();
import express from "express";


const app = express();


app.use(express.urlencoded({ extended: true }));



import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080"
  })
);

import cookieParser from "cookie-parser";
app.use(cookieParser());

import UserRouter from './Routes/userRoutes.js';
import ParkingArea from './Routes/parkingAreaRoutes.js';


app.use(express.json());
app.use(UserRouter);
app.use(ParkingArea);

app.use(helmet());
app.use(morgan("tiny")); // display in console HTTP requests


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if(err){
    console.log("connection error: ", err);
  }
  else{
    console.log("Connected to MongoDB successfully");
  }
}); 




import { Server } from "socket.io";


const io = new Server(5000,{
  cors: {
   origin: ["http://localhost:8080"]
  }
})




io.on('connection', (socket) => {

  
  socket.on('chat message', (msg, username) => {
    
    let dataToSend = username+": "+msg

    io.emit('chat message', dataToSend);
  });
});






app.listen(process.env.PORT, () => {
 console.log(`Server is listening on port ${process.env.PORT}`);
});
