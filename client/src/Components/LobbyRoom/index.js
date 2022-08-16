import React from 'react';

const LobbyRoom = ({ roomName, display, handleClick1 } ) => {

    return (
        <div style={{display: display, flexDirection: "column"}}>
            <h2>Welcome to {roomName}</h2>
            
        </div>
    );
}

export default LobbyRoom;
