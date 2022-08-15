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
    //define all your socket events
    newSocket.on("custom-event", ({ value1, value2 }) => {
        //Do something with the values
    });
    setSocket(newSocket);
    }, []);
	```

    
<br>

## Events the socket can send to the server
___ 
* Join room ==> `socket.emit('join-room', {roomid, username})
	* This should be sent as a useEffect as soon as the game page is rendered
	* `roomid` can be obtained by using the `useParams()` hook as below
		* `const {roomid} = useParams()`


<br>

## Events the socket should prepare to receive from the server
___
* invalid-room ==> `socket.on('invalid-room', () => {}`
	- if the room id entered by the user does not exist, this event is sent to the client
* new-user ==> `socket.on('new-user', ({username}) => {}`
	* Every time a new user enters the room this event will get send to every client in that room. We can update our list of users in the lobby upon receiving this event

