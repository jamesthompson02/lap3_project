import React from "react";
import axios from "axios";
import { useRef, useState } from "react";
import "./style.css";

const LeaderBoard = ({}) => {
  const categoryRef = useRef();
  const difficultyRef = useRef();
  const questionTypeRef = useRef();
  const usernameRef = useRef();

  const [mapData, setMapData] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    const categoryId = categoryRef.current.value;
    const difficulty = difficultyRef.current.value;
    const type = questionTypeRef.current.value;

    const getLeaderboard = async () => {
      try {
        const { data } = await axios.get(
          `https://lap3-project.herokuapp.com/leaderboard/${categoryId}/${difficulty}/${type}`
        ); // need to remember to change this to heroku url - remember to check and change backend too
        console.log(data);
        setMapData(data);
      } catch (err) {
        alert(`${err.response.data}`);
      }
    };
    getLeaderboard();
  };

  const submitForm2 = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;

    const getUserLeaderboard = async () => {
      try {
        const { data } = await axios.get(
          `https://lap3-project.herokuapp.com/leaderboard/${username}`
        );
        console.log(data);
        setMapData(data);
      } catch (err) {
        alert(`${err.response.data}`);
      }
    };
    getUserLeaderboard();
  };

  return (
    //need to change the values to be the text so that the db query works, need to send the value in the body
    <>
      <h1>Triviaholic LeaderBoard</h1>
      <h4>
        Enter your username and see how well you've done on all of the quizzes
        that you've taken so far
      </h4>
      <form role="form">
        <div>
          <label className="form-label" htmlFor="username">
            <input
              className="usernameInput"
              ref={usernameRef}
              type="text"
              placeholder="Enter your username here"
            />
          </label>
          <button type="submit" onClick={submitForm2}>
            Submit
          </button>
        </div>
        <br />
        <h4>
          Pick your quiz category, difficulty and question type and see how you
          stack up against other users
        </h4>
        <div className="input-container">
          <label className="form-label" htmlFor="category">
            Category:
          </label>
          <select ref={categoryRef} id="category">
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment - Books</option>
            <option value="11">Entertainment - Film</option>
            <option value="12">Entertainment - Music</option>
            <option value="13">Entertainment - Musicals & Theatres</option>
            <option value="14">Entertainment - Television</option>
            <option value="15">Entertainment - Video Games</option>
            <option value="16">Entertainment - Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science - Computers</option>
            <option value="19">Science - Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment - Comics</option>
            <option value="30">Science - Gadgets</option>
            <option value="31">Entertainment - Japanese Manga & Anime</option>
            <option value="32">Entertainment - Cartoon & Animations</option>
          </select>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="difficulty">
            Difficulty:
          </label>
          <select ref={difficultyRef} id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="question-type">
            Question Type:
          </label>
          <select ref={questionTypeRef} id="question-type">
            <option value="multiple">Multiple</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
        <div>
          <button type="submit" onClick={submitForm}>
            Submit
          </button>
        </div>
      </form>

      <br />

      <div className="tableDiv">
        {mapData ? (
          <table>
            <thead>
              <tr>
                <th className="tableHead">Username</th>
                <th className="tableHead">Category</th>
                <th className="tableHead">Difficulty</th>
                <th className="tableHead">Question Type</th>
                <th className="tableHead">Score</th>
              </tr>
            </thead>
            <tbody>
              {mapData.length > 0 ? (
                mapData.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td className="tableBody">{val.username}</td>
                      <td className="tableBody">{val.category}</td>
                      <td className="tableBody">{val.difficulty}</td>
                      <td className="tableBody">{val.question_type}</td>
                      <td className="tableBody">{val.score}</td>
                    </tr>
                  );
                })
              ) : (
                <p>No scores available, soz </p>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
      <br />
    </>
  );
};

export default LeaderBoard;
