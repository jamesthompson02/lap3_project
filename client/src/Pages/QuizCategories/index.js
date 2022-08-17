import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './QuizCategories.style.css';

import { Answers, CardQuestion } from '../../Components';

const QuizCategories = () => {
  const serverEndpoint = 'https://lap3-project.herokuapp.com/';
  const [data, setData] = useState({});
  const [answers, setAnswers] = useState([]);
  const [socket, setSocket] = useState(null);
  // const [buttonColor, setbuttonColor] = useState('bg');
  const username = 'testuser';
  const roomid = 'testQuestions11';
  // const fetchData = async () => {
  //   const response = await axios.get(
  //     'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
  //   );

  //   return { ...response.data.results[0] };
  // };

  // const grabData = async () => {
  //   const data = await fetchData();

  //   const joinedAnswers = [data.correct_answer, ...data.incorrect_answers];

  //   setData(data);
  //   setAnswers(joinedAnswers);
  // };

  // useEffect(() => {
  //   grabData();
  // }, []);

  const connectRoom = () => {
    // await new Promise((r) => setTimeout(r, 3000));
    console.log(socket);
    socket.emit('join-room', {
      roomid,
      username,
    });
    socket.emit('start-game', { roomid });
  };
  useEffect(() => {
    const newSocket = io(serverEndpoint);
    //define all your socket events you'll expect to receive
    newSocket.on('next-question', ({ nextQuestion }) => {
      //Do something with the values
      setData(nextQuestion);
      setAnswers([
        nextQuestion.correct_answer,
        ...nextQuestion.incorrect_answers,
      ]);
      // setbuttonColor('bg');
    });
    setSocket(newSocket);
  }, []);

  const handleClick = (e) => {
    // const currentClickedButton = e.target.closest('button');
    // const choice = currentClickedButton.value;

    // if (choice === data.correct_answer) {
    //   currentClickedButton.className = 'bgGreen';
    // } else {
    //   currentClickedButton.className = 'bgRed';
    // }
    // currentClickedButton.className = buttonColor;

    const clickedButton = e.target.closest('button');
    const choice = clickedButton.value;

    if (choice === data.correct_answer) {
      clickedButton.classList.add('bgGreen');
    } else {
      clickedButton.classList.add('bgRed');
    }

    socket.emit('submit-answer', {
      roomid,
      username,
      answer: choice,
      timer: 1500,
    });
    // grabData();
  };

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      <button onClick={connectRoom}>connectRoom</button>
      {data.question ? (
        <CardQuestion category={data.category} question={data.question} />
      ) : (
        <span>Loading...</span>
      )}
      <div className="answers">
        {answers.length > 0 &&
          answers.map((answer, index) => {
            return (
              <Answers
                choice={handleClick}
                answer={answer}
                correct={data.correct_answer}
                id={index}
                handleClick={handleClick}
                // color={buttonColor}
              />
            );
          })}
      </div>
    </div>
  );
};

export default QuizCategories;
