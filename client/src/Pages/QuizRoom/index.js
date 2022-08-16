import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UsernameDiv from '../../Components/UsernameDiv';
import LobbyRoom from '../../Components/LobbyRoom';

const QuizRoom = () => {

    const { roomId } = useParams();

    const [ userDivDisplay, setUserDisplay ] = useState("flex");
    const [ lobbyDisplay, setLobbyDisplay ] = useState("none");


    return (
        <div>
            <UsernameDiv display={userDivDisplay} handleClick1={setUserDisplay} handleClick2={setLobbyDisplay} roomName={roomId} />
            <LobbyRoom display={lobbyDisplay} roomName={roomId}/>

            

            
        </div>
    );
}

export default QuizRoom;
