import React, { useState } from 'react';
import StarterQuizDiv from '../../Components/StarterQuizDiv';
import QuizSettings from '../../Components/QuizSettings';
import JoinRoomDiv from '../../Components/JoinRoomDiv';

const Quiz = () => {
  const [starterDivDisplay, setStarterDisplay] = useState('flex');
  const [settingsDiv, setSettingsDisplay] = useState('none');
  const [joinRoomDiv, setJoinDisplay] = useState('none');

  function moveToSettings() {
    setStarterDisplay('none');
    setSettingsDisplay('flex');
    return;
  }

  function goBackToStart() {
    setStarterDisplay('flex');
    setSettingsDisplay('none');
  }

  function movetoJoinRoom() {
    setStarterDisplay('none');
    setJoinDisplay('flex');
  }

  function fromJoinToStart() {
    setJoinDisplay('none');
    setStarterDisplay('flex');
  }

  return (
    <div>
<<<<<<< HEAD
      <h1 style={{textAlign: "center"}}>Take a Quiz!</h1>
      <StarterQuizDiv display={starterDivDisplay} handleClick1={moveToSettings} handleClick2={movetoJoinRoom} />
      <QuizSettings display={settingsDiv} handleClick1={goBackToStart}/>
      <JoinRoomDiv display={joinRoomDiv} handleClick1={fromJoinToStart}/>
=======
      <h1>Quiz Page</h1>
      <StarterQuizDiv
        display={starterDivDisplay}
        handleClick1={moveToSettings}
        handleClick2={movetoJoinRoom}
      />
      <QuizSettings display={settingsDiv} handleClick1={goBackToStart} />
      <JoinRoomDiv display={joinRoomDiv} handleClick1={fromJoinToStart} />
>>>>>>> a4d702d0779ea3d70d93a8751496d8fea05a111a
    </div>
  );
};

export default Quiz;
