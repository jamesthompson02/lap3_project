import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Btn from '../Btn';
import RoomCheckBox from '../RoomCheckBox';
import './style.css';

const JoinRoomDiv = ({display, handleClick1}) => {

    const navigator2 = useNavigate();

    const filterText = useRef();

    const [ searchText, setText ] = useState(""); 

    const [ roomsAvailable, setRooms ] = useState("");

    const changeText = (e) => {
        const input = e.target.value;
        setText(input);
        const allRooms = [...roomsAvailable];
        const modifiedRooms = [...allRooms.map(room => {
            const splitSpaces = room.props.room.split(" ");
            return splitSpaces;            
        })]
        const filteredRooms = modifiedRooms.filter(roomName => {
            if (roomName[0].toLowerCase().startsWith(input.toLowerCase())) {
                return roomName;
            }
        })
        const restoredRooms = filteredRooms.map(roomName => {
            if (roomName.length > 1) {
                return <RoomCheckBox key={newKeyGenerator()} room={roomName.join(" ")} />
            } else {
                return <RoomCheckBox key={newKeyGenerator()} room={roomName[0]} />
            }
        })
        setRooms(restoredRooms);

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
            const response = await axios.get('https://lap3-project.herokuapp.com/rooms/');
            const rooms = response.data;
            const getRooms = rooms.map(room => {

                const newKey = newKeyGenerator();
    
                return(
                    <RoomCheckBox key={newKey} room={room} />
                )
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


    function countCheckedBoxes() {
        const numOfCheckBoxes = [...document.querySelectorAll(".room-checkbox")];
        const checkedBoxes = [];
        const labels = [...document.querySelectorAll(".room-checkbox-label")];

        numOfCheckBoxes.forEach(room => {
            if (room.checked === true) {
                checkedBoxes.push(numOfCheckBoxes.indexOf(room));
            }

        })

        if (checkedBoxes.length === 0) {
            alert("Please ensure you have selected one room")
        } else if (checkedBoxes.length > 1) {
            alert("Please ensure you have only selected one room")
        } else {
            setTimeout(() => {
                navigator2(`../rooms/${labels[checkedBoxes].textContent}`, { replace: true});
            }, 750);
        }
    }

    




    return (
        <div style={{display: display, flexDirection: "column", minHeight: "calc(100vh - 100px - 56px)", alignItems: "center"}}>
            <div style={{display: "flex"}}>
                <label htmlFor='search-rooms'>Search for Rooms:</label>
                <input ref={filterText} type="text" value={searchText} onChange={changeText} maxLength={20} className="form-control"/>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {roomsAvailable}

               



            </div>
            <div style={{display: "flex", justifyContent: "space-between", minWidth: "200px", maxWidth: "250px", margin: "1rem 0"}}>
                <Btn text="Go Back" handleClick={handleClick1} />
                <button onClick={countCheckedBoxes} className="btn btn-primary">Join Room</button>
                
            </div>
            
        </div>
    );
}

export default JoinRoomDiv;
