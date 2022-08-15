import React, { useState } from 'react';
import axios from 'axios';
import StarterQuizDiv from '../../Components/StarterQuizDiv';
import QuizSettings from '../../Components/QuizSettings';


const Quiz = () => {

    const [ starterDivDisplay, setStarterDisplay ] = useState("flex");
    const [ settingsDiv, setSettingsDisplay ] = useState("none");

    function moveToSettings() {
        setStarterDisplay("none");
        setSettingsDisplay("flex");
        return
    }

    function goBackToStart() {
        setStarterDisplay("flex");
        setSettingsDisplay("none");
    }


  return (
    <div>
      <h1>Quiz Page</h1>
      <StarterQuizDiv display={starterDivDisplay} handleClick1={moveToSettings} />
      <QuizSettings display={settingsDiv} handleClick1={goBackToStart}/>
    </div>
  );
};

export default Quiz;