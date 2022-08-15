const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", //make this the netlify link for the react app
    methods: ["GET", "POST"],
  },
});
const axios = require('axios')

const roomList = [];
const activeGames = [];

const getQuestions = async (settings) => {
    const {numberOfQuestions, category, difficulty, questionType} = settings
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionType}`)
    const { results } = await data;
    return results
}   

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("disconnect", (socket) => {
    console.log("client disconnected");
  });

  // Socket events go here
  socket.on("join-room", ({ roomid, username }) => {
    const currentRoom = roomList.filter(room => room.name === roomid)[0]
    if (!currentRoom){
        socket.emit('invalid-room')
        return;
    }
    currentRoom.users.push(username);
    if (currentRoom.users.length === 1){
        currentRoom.host = username;
    }
    socket.join(roomid)
    io.to(roomid).emit('new-user', ({username}))
  });

  socket.on("start-game", ({roomid}) => {
    //send the first question to every user in the room
    io.to(roomid).emit("game-start")
    const currentRoom = roomList.filter(room => room.name === roomid)[0]
    activeGames.push({
        ...currentRoom,
        users: currentRoom.users.map(user => {
            return {name: user, score: 0}
        }),
        questionIndex: 1,
        ready: 0,        
    })
    let nextQuestion = ""
    io.to(roomid).emit('next-question', {nextQuestion})

  });
  socket.on("submit-answer", ({roomid, username}) => {

  })
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/rooms/create", async (req, res) => {
  const currentRoom = roomList.filter(room => room.name === req.body.roomid)[0]
  if (currentRoom){
    res.status(401).send('room already exists, pick a new name')
    return;
  }
  let obj = {};
  obj["name"] = req.body.roomid; //name of the room and therefore the URL
  obj["users"] = []; //list of users in the room
  obj["host"] = ""; //set's the first user as the admin so they can have access to the start button
  obj["questions"] = await getQuestions(req.body.settings)
  roomList.push(obj);
  res.status(201).send('Room successfully created : ' + obj.name);
});

app.get("/rooms/data", (req, res) => {
  res.send(roomList);
});

app.get("/rooms", (req, res) => {
  const rooms = roomList.map((room) => room.name);
  res.send(rooms);
});

app.post("/rooms/join", (req,res)=>{
    const currentRoom = roomList.filter(room => room.name === req.body.roomid)[0]
    if (!currentRoom){
        res.status(400).send("couldn't find that room")
        return;
    }
    currentRoom.users.push(req.body.username)
    res.status(204).send('Successfully joined room')
})

module.exports = server

