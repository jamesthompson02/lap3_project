const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: "*",
});
const axios = require("axios");

const leaderboardRoutes = require("./routes/scoresRoutes");
const scoresController = require("./controllers/scores");
const Scores = require("./models/scores");

const roomList = [];
const activeGames = [];

const getQuestions = async (settings) => {
  const { numberOfQuestions, category, difficulty, questionType } = settings;
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionType}`
  );
  const { results } = await data;
  return results;
};

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("disconnect", () => {
    console.log("client disconnected");
    const roomToChange = roomList.filter((room) =>
      room.ids.includes(socket.id)
    )[0];
    if (!roomToChange) {
      return;
    }
    if (roomToChange.users.length === 1) {
      const indexOfRoom = roomList.indexOf(roomToChange);
      roomList.splice(indexOfRoom, 1);
      return;
    }
    const userID = roomToChange.ids.indexOf(socket.id);
    const host = socket.id === roomToChange.host.id;
    if (!roomToChange.open) {
      const gameToChange = activeGames.filter(
        (game) => game.name === roomToChange.name
      )[0];
      gameToChange.ids.splice(userID, 1);
      gameToChange.users.splice(userID, 1);
    }
    roomToChange.ids.splice(userID, 1);
    roomToChange.users.splice(userID, 1);
    if (host) {
      roomToChange.host = {
        username: roomToChange.users[0],
        id: roomToChange.ids[0],
      };
    }
    if (roomToChange.open) {
      const newUserList = roomToChange.users;
      io.to(roomToChange.name).emit("new-user", { userList: newUserList });
    }
  });

  // Socket events go here
  socket.on("join-room", ({ roomid, username }) => {
    const currentRoom = roomList.filter((room) => room.name === roomid)[0];

    if (!currentRoom) {
      socket.emit("invalid-room");
      return;
    }
    if (!currentRoom.open) {
      socket.emit("room-closed");
      return;
    }
    if (currentRoom.users.filter((user) => user === username).length > 0) {
      socket.emit("name-taken");
      return;
    }
    currentRoom.users.push(username);
    currentRoom.ids.push(socket.id);
    if (currentRoom.users.length === 1) {
      currentRoom.host = { username: username, id: socket.id };
      socket.emit("host-user");
    }
    socket.join(roomid);
    const userList = currentRoom.users;
    io.to(roomid).emit("new-user", { userList });
  });

  socket.on("start-game", ({ roomid }) => {
    //send the first question to every user in the room
    io.to(roomid).emit("game-start");
    const currentRoom = roomList.filter((room) => room.name === roomid)[0];
    currentRoom.open = false;
    activeGames.push({
      ...currentRoom,
      users: currentRoom.users.map((user) => {
        return { name: user, score: 0 };
      }),
      questionIndex: 0,
      ready: 0,
    });
    let nextQuestion = currentRoom.questions[0];
    io.to(roomid).emit("next-question", { nextQuestion });
  });
  socket.on("submit-answer", ({ roomid, username, answer }) => {
    const currentRoom = activeGames.filter((room) => room.name === roomid)[0];
    //update score
    const correctAnswer =
      currentRoom.questions[currentRoom.questionIndex].correct_answer;
    if (answer === correctAnswer) {
      const currUser = currentRoom.users.filter(
        (user) => user.name === username
      )[0];
      currUser.score += (1500 - (currentRoom.ready * (1000 / (currentRoom.users.length))));
    }
    //increase ready count
    currentRoom.ready += 1;
    console.log(
      `ready count ${currentRoom.ready} / ${currentRoom.users.length}`
    );
    //next question
    if (currentRoom.ready === currentRoom.users.length) {
      if (currentRoom.questionIndex < currentRoom.questions.length - 1) {
        currentRoom.questionIndex += 1;
        let nextQuestion = currentRoom.questions[currentRoom.questionIndex];
        currentRoom.ready = 0;
        io.to(roomid).emit("next-question", { nextQuestion });
      } else {
        //send final scores
        const userScores = currentRoom.users;
        io.to(roomid).emit("quiz-finished", { userScores });
        userScores.forEach((user) => {
          Scores.createScore(
            user.name,
            currentRoom.questions[0].category,
            currentRoom.questions[0].difficulty,
            currentRoom.questions[0].type,
            user.score,
            currentRoom.categoryKey
          );
        });
      }
    }
  });
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/rooms/create", async (req, res) => {
  const currentRoom = roomList.filter(
    (room) => room.name === req.body.roomid
  )[0];
  if (currentRoom) {
    res.status(401).send("room already exists, pick a new name");
    return;
  }
  let obj = {};
  obj["name"] = req.body.roomid; //name of the room and therefore the URL
  obj["users"] = []; //list of users in the room
  obj["ids"] = [];
  obj["host"] = {}; //set's the first user as the admin so they can have access to the start button
  obj["questions"] = await getQuestions(req.body.settings);
  obj["open"] = true;
  obj["categoryKey"] = req.body.settings.category
  roomList.push(obj);
  res.status(201).send("Room successfully created : " + obj.name);
});

app.get("/rooms/data", (req, res) => {
  res.send(roomList);
});

app.get("/rooms/active", (req, res) => {
  res.send(activeGames);
});

app.get("/rooms", (req, res) => {
  const rooms = roomList.filter((room) => room.open).map((room) => room.name);
  res.status(200).send(rooms);
});

app.post("/rooms/join", (req, res) => {
  const currentRoom = roomList.filter(
    (room) => room.name === req.body.roomid
  )[0];
  if (
    currentRoom.users.filter((user) => user === req.body.username).length > 0
  ) {
    res.status(400).send("Name already taken");
    return;
  }
  if (!currentRoom) {
    res.status(400).send("couldn't find that room");
    return;
  } else if (!currentRoom.open) {
    res.status(409).send("Game already started");
  }
  currentRoom.users.push(req.body.username);

  res.status(204).send("Successfully joined room");
});

app.use("/leaderboard", leaderboardRoutes);

app.post("/create", scoresController.createScore);

app.delete("/delete/:id", scoresController.destroyScore);

module.exports = server;
