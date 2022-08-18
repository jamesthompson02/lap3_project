const io = require("socket.io-client");
const server = require("../../server");
const request = require("supertest");
describe("Testing socket functionality", () => {
  let clientSocket;
  let api;

  beforeAll(async () => {
    console.log("This is the new divider ____________________-");
    api = server.listen(5001, () =>
      console.log("Test server running on port 5001")
    );
    clientSocket = io("http://localhost:5001");
    clientSocket.on("connect", () =>
      console.log("client connected in test server")
    );
    await request(api)
      .post("/rooms/create")
      .set("Content-type", "application/json")
      .send({
        roomid: "validRoom",
        settings: {
          category: 9,
          numberOfQuestions: 2,
          difficulty: "medium",
          questionType: "multiple",
        },
      });
    await new Promise((r) => setTimeout(r, 500));
  });

  afterAll((done) => {
    api.close(done);
    clientSocket.close(done);
  });

  it("should be accessible on port 5000", async () => {
    const res = await request(api).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("hello world");
  });

  it("on trying to join an invalid room, an invalid-room event is received", async () => {
    const mockFn = jest.fn();
    clientSocket.on(`invalid-room`, () => {
      mockFn();
    });
    clientSocket.emit("join-room", {
      roomid: "testRoom",
      username: "testUser",
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalled();
  });

  it("on trying to join a valid room, a new-user event should be received", async () => {
    const mockFn = jest.fn();
    clientSocket.on(`new-user`, ({ userList }) => {
      expect(userList).toEqual(["testUser"]);
      mockFn();
    });

    clientSocket.emit("join-room", {
      roomid: "validRoom",
      username: "testUser",
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalled();
  });

  it("receives a game-start event followed by the first question upon the host starting the game", async () => {
    const mockFn = jest.fn();
    clientSocket.on(`game-start`, () => {
      mockFn();
    });

    clientSocket.on(`next-question`, ({ nextQuestion }) => {
      mockFn();
    });

    clientSocket.emit("start-game", {
      roomid: "validRoom",
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("user receives the next question when all players have submit", async () => {
    const mockFn = jest.fn();
    clientSocket.on(`next-question`, ({ nextQuestion }) => {
      mockFn();
    });

    clientSocket.emit("submit-answer", {
      roomid: "validRoom",
      username: "testUser",
      msg: "A Message",
      timer: 1500,
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("will refuse entry to a user trying to join an active game that has started", async () => {
    const mockFn = jest.fn();
    clientSocket.on("room-closed", () => {
      mockFn();
    });
    
    clientSocket.emit("join-room", {
      roomid: "validRoom",
      username: "testingUser",
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalled();
  });

  it("Upon the game ending, the score list is sent to all users", async () => {
    const mockFn = jest.fn();
    clientSocket.on(`quiz-finished`, ({ userScores }) => {
      mockFn();
    });
    clientSocket.emit("start-game", { roomid: "validRoom" });
    clientSocket.emit("submit-answer", {
      roomid: "validRoom",
      username: "testUser",
      answer: "A Message"
    });
    clientSocket.emit("submit-answer", {
      roomid: "validRoom",
      username: "testUser",
      answer: "A Message"
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalled();
  });

  it("will refuse entry to a user trying to join an active game that has started", async () => {
    const mockFn = jest.fn();
    clientSocket.on(`name-taken`, () => {
      mockFn();
    });
    clientSocket.emit("join-room", {
      roomid: "validRoom",
      username: "testUser",
    });
    await new Promise((r) => setTimeout(r, 500));
    clientSocket.emit("join-room", {
      roomid: "validRoom",
      username: "testUser",
    });
    await new Promise((r) => setTimeout(r, 500));
    expect(mockFn).toHaveBeenCalled();
  });

  it("Upon the final user leaving a lobby, the room is closed", async () => {
    clientSocket.close()
    await new Promise((r) => setTimeout(r, 500));
    const res = await request(api).get('/rooms')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([])
  });
});
