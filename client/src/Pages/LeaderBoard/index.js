import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import { LeaderBoard } from "../../Components";

const LeaderBoardPage = () => {
  const styles = {
    textAlign: "center",
    listStylePosition: "inside",
  };
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  console.log(dimension);
  return (
    <div style={styles}>
      <ReactConfetti />
      <LeaderBoard />

      {/* <h1>Final Scores</h1>
      <br />
      <h5>Here is your score:</h5>
      <br />
      <p>Jack: 9</p>
      <h1>All time High Scores:</h1>
      <ol>
        <li>Jake: 9</li>
        <li>Jack: 9</li>
        <li>Jack: 9</li>
        <li>Jack: 9</li>
        <li>Jack: 9</li>
        <li>Jack: 9</li>
        <li>Jack: 9</li>
      </ol> */}
    </div>
  );
};

export default LeaderBoardPage;
