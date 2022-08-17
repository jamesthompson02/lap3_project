import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import LobbyRoom from '../../Components/LobbyRoom';


const QuizRoom = () => {

    const { roomId } = useParams();

    const serverEndpoint = "https://lap3-project.herokuapp.com";

    const [ userDivDisplay, setUserDisplay ] = useState("flex");
    const [ lobbyDisplay, setLobbyDisplay ] = useState("none");

    const [userList, setUserList] = useState([]);

    const [ isHost, setHost ] = useState(false);

    const [ socket, setSocket ] = useState(null);

    const [usernameField, setUsername ] = useState("");

    const inputUsername = useRef();

    
    useEffect(() => {

        const newSocket = io(serverEndpoint);
        

        newSocket.on("name-taken", () => {
            alert("Sorry, that username is already taken.")
            
        });

        newSocket.on("host-user", () => {
            setHost(true);
            
        });

        newSocket.on("new-user", ({userList}) => {
            setUserDisplay("none");
            setLobbyDisplay("flex");
            setUserList(userList);

            
        });

        
        setSocket(newSocket);
        }, []
    );

       

    

    function addUsername(e) {

        e.preventDefault();

        

        if (!inputUsername.current.value) {
            alert("Please input a username to continue")
        } else {
            socket.emit("join-room", {roomid: roomId, username: inputUsername.current.value});
            

        }
        
        

    }

    function changeUsername() {
        const newUsername = inputUsername.current.value;
        setUsername(newUsername);
    }



    return (
        <div>
            {/* <UsernameDiv display={userDivDisplay} roomName={roomId} socket={socket}/>  */}
            <div style={{display: userDivDisplay, minHeight: "calc(100vh - 100px)", justifyContent: "center", alignItems: "center"}}>
                <form style={{display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "500px", border: "1px solid black", borderRadius: "15px", padding: "2rem"}}>
            
                    <h2>Create a Username!</h2>
                    <div style={{display: "flex"}}>
                        <label htmlFor='usernameInput'>Username:</label>
                        <input ref={inputUsername} id="usernameInput" type="text" maxLength={20} onChange={changeUsername} />
                    </div>
                    <button style={{marginTop: "1rem"}}onClick={addUsername}>Create Username</button>

                </form>
            </div>

            <LobbyRoom display={lobbyDisplay} roomName={roomId} username={usernameField} userList={userList} hostStatus={isHost} hostFunc={setHost}/> 

            

            
        </div>
    );
}

export default QuizRoom;
