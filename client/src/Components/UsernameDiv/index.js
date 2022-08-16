import React, { useRef, useState } from 'react';
import axios from 'axios';
import io from "socket.io-client";
const serverEndpoint = "https://lap3-project.herokuapp.com";


const UsernameDiv = ({ roomName, display, handleClick1, handleClick2 }) => {

    const inputUsername = useRef();

    const [ socket, setSocket ] = useState(null);

    function addUsername(e) {
        e.preventDefault();

        const quizRoom = [];
        const preExistingUsernames = [];
        
        const getUsernames = async () => {
            const { data } = await axios.get('https://lap3-project.herokuapp.com/rooms/data');
            data.forEach(room => {
                if (room.name === roomName) {
                    quizRoom.push(room);
                }
            })
            console.log(quizRoom[0]);
            handleClick1("none");
            handleClick2("flex");

        }

        getUsernames();

    }


    return (
        <form style={{display: display, flexDirection: "column", alignItems: "center", maxWidth: "500px"}}>
        
            <h2>Create a Username!</h2>
            <div style={{display: "flex"}}>
                <label htmlFor='usernameInput'>Username:</label>
                <input ref={inputUsername} id="usernameInput" type="text" maxLength={20} />
            </div>
            <button onClick={addUsername}>Create Username</button>




        </form>
    );
}

export default UsernameDiv;
