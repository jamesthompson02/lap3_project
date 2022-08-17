import React, { useState } from 'react';
import StarterQuizDiv from '../../Components/StarterQuizDiv';
import QuizSettings from '../../Components/QuizSettings';
import JoinRoomDiv from '../../Components/JoinRoomDiv';


const Quiz = () => {

    const [ starterDivDisplay, setStarterDisplay ] = useState("flex");
    const [ settingsDiv, setSettingsDisplay ] = useState("none");
    const [ joinRoomDiv, setJoinDisplay ] = useState("none");

    function moveToSettings() {
        setStarterDisplay("none");
        setSettingsDisplay("flex");
        return
    }

    function goBackToStart() {
        setStarterDisplay("flex");
        setSettingsDisplay("none");
    }

    function movetoJoinRoom() {
      setStarterDisplay("none");
      setJoinDisplay("flex");

    }

    function fromJoinToStart() {
      setJoinDisplay("none");
      setStarterDisplay("flex");

    }


  return (
    <div>
      <h1>Quiz Page</h1>
      <StarterQuizDiv display={starterDivDisplay} handleClick1={moveToSettings} handleClick2={movetoJoinRoom} />
      <QuizSettings display={settingsDiv} handleClick1={goBackToStart}/>
      <JoinRoomDiv display={joinRoomDiv} handleClick1={fromJoinToStart}/>
    </div>
  );
};


export default Quiz;

