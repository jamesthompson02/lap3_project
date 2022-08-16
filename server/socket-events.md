## Server Endpoints
___
* GET /
	* Returns "hello world"
* GET /rooms
	* Returns a string list of the available valid rooms
* GET /rooms/data
	* Returns a list of room objects
* POST /rooms/create
	* requires a roomid and the settings for the quiz
	* Returns status 201 if successful
	* Returns status 400 if not
* POST /rooms/join
	* requires a roomid
	* returns status 204 if successful
	* returns status 404 if room does not exist
<br>

## Setting up front-end sockets
___

1. Make sure to npm install and import the `socket.io-client` module and specify the server endpoint (either the Heroku or localhost URL)
	```js
	import io from "socket.io-client";
	const serverEndpoint = "http://localhost:5001";
	```
2. Create a useState() hook for holding the socket, this should begin as null

```javascript
  const [socket, setSocket] = useState(null);
```

3. Create the socket connection to the server inside of a useEffect hook which runs only once on page render
	```javascript
	useEffect(() => {
    const newSocket = io(serverEndpoint);
    //define all your socket events you'll expect to receive
    newSocket.on("custom-event", ({ value1, value2 }) => {
        //Do something with the values
    });
    setSocket(newSocket);
    }, []);
	```

    
<br>

## Events the socket can send to the server
___ 
* join-room ==> `socket.emit('join-room', {roomid, username})`
	* This should be sent as a useEffect as soon as the game page is rendered
	* `roomid` can be obtained by using the `useParams()` hook as below
		* `const {roomid} = useParams()`
* submit-answer ==> `socket.emit('submit-answer', {roomid, username, answer, timer})`
	* This event should be emitted whenever a user selects an answer for the current question (users should only be able to submit an answer once per question)
	* It requires the user to send their roomid, username, selected answer and the remaining time on the timer to calculate the score
* start-game ==> `socket.emit('start-game', {roomid})`
	* This event should be emitted by the host user who created the lobby upon them clicking the start game button
	* This will cause the server to stop letting new users into the room and start serving questions to the users


<br>

## Events the socket should prepare to receive from the server
___
* invalid-room ==> `socket.on('invalid-room', () => {}`
	- if the room id entered by the user does not exist, this event is sent to the client
* room-closed ==> `socket.on('room-closed', () => {}`
	- if the game has already started, this event is sent back to the user trying to join
* new-user ==> `socket.on('new-user', ({userList}) => {}`
	* Every time a new user enters the room this event will get send to every client in that room. We can update our list of users in the lobby upon receiving this event.
	* userList = ["user1", "user2", "user3"]
* next-question ==> `socket.on('next-question', ({nextQuestion}) => {}`
	* When every user has submitted an answer for the current question, the server will send the next one in this event
	* Currently this is the whole single question object from the API
* game-start ==> `socket.on('game-start', () => {}`
	* Tells the clients the lobby is now closed and the game is about to start
	* This event can be used to trigger a change in the display, e.g. to change the lobby view into the game view
* quiz-finished ==> `socket.on('quiz-finished', ({userScores}) => {}`
	* Upon users answering the final question, this event is emitted from the server
	* userScores is an array of objects, where each object contains a username and that user's score

