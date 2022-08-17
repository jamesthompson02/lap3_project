import React, { useEffect } from 'react';

const LobbyRoom = ({ roomName, display, userList, hostStatus, hostFunc, username } ) => {

    

    useEffect(() => {
        if (display === "flex") {
            console.log(username);
            if (userList.length === 1) {
                hostFunc(true);
                console.log(hostStatus);
            } else if (userList.length > 1 && username === userList[0]){
                hostFunc(true);
                console.log(hostStatus);

            } else {
                console.log(hostStatus);
            }
        }

    }, [display, userList])

    

    function newKeyGenerator() {
        let newKey = "";
        for (let i = 0; i <= 24; i++) {
            let newNum = Math.floor(Math.random() * 10);
            newKey += newNum;
        }
        return newKey;
    }

    const displayAllUsers = userList.map(username => {
        return <li key={newKeyGenerator()}>{username}</li>
    })
    

    return (
        <div style={{display: display, flexDirection: "column"}}>
            <h2>Welcome to {roomName}</h2>
            <div style={{display: "flex", flexDirection: "column"}}>
                <ul style={{listStyle: "none"}}>
                    {displayAllUsers}
                </ul>
            </div>

            { hostStatus ? <button style={{maxWidth: "150px"}}>Start Game</button> : console.log("")}
            
        </div>
    );
}

export default LobbyRoom;
