import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import Btn from '../Btn';

const JoinRoomDiv = ({display, handleClick1}) => {

    const filterText = useRef();

    const [ searchText, setText ] = useState(""); 

    const [ roomsAvailable, setRooms ] = useState("");

    const changeText = (e) => {
        const input = e.target.value;
        setText(input);
    }

    function newKeyGenerator() {
        let newKey = '';
        for (let i = 0; i <= 24; i++) {
            let newNumberForKey = Math.floor(Math.random() * 10);
            newKey += newNumberForKey;
        }
        return newKey;
    }

    const getAllRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5002/rooms/');
            const rooms = response.data;
            const getRooms = rooms.map(room => {
                return <li key={newKeyGenerator()}>{room}</li>
            });
            setRooms(getRooms);    
        } catch (e) {
            console.log(e);
        }
        
    }

    useEffect(() => {
        if (display !== "none" && !searchText) {
            getAllRooms();
        }

    }, [display, searchText])




    return (
        <div onChange={getAllRooms} style={{display: display, flexDirection: "column"}}>
            <div style={{display: "flex"}}>
                <label htmlFor='search-rooms'>Search for Rooms:</label>
                <input ref={filterText} type="text" value={searchText} onChange={changeText} maxLength={20}/>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {roomsAvailable}

               



            </div>
            <div style={{display: "flex", justifyContent: "space-between", minWidth: "200px", maxWidth: "250px", margin: "1rem 0"}}>
                <Btn text="Go Back" handleClick={handleClick1} />
                <button>Join Room</button>
                
            </div>
            
        </div>
    );
}

export default JoinRoomDiv;
