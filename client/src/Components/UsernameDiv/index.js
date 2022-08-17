import React, { useRef, useState } from 'react';
import axios from 'axios';



const UsernameDiv = ({ roomName, display, socket }) => {

    const inputUsername = useRef();

    

    function addUsername(e) {
        e.preventDefault();

        

        if (!inputUsername.current.value) {
            alert("Please input a username to continue")
        } else {
            socket.emit("join-room", {roomid: roomName, username: inputUsername.current.value});

        }
        
        

    }


    return (
        <form style={{display: display, flexDirection: "column", alignItems: "center", maxWidth: "500px", border: "1px solid black"}}>
        
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
