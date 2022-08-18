import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './QuizCategories.style.css';

import { Answers, CardQuestion } from '../../Components';

const QuizCategories = ({ socket, roomid, username, data, answers }) => {
  const handleClick = (e) => {
    const clickedButton = e.target.closest('button');
    const choice = clickedButton.value;
    // if (choice === data.correct_answer) {
    //   clickedButton.classList.add('bgGreen');
    // } else {
    //   clickedButton.classList.add('bgRed');
    // }
    socket.emit('submit-answer', {
      roomid,
      username,
      answer: choice
    });
    // grabData();
  };

  return (
    <div className="container">
      <div className='d-flex align-items-center justify-content-center'>
      <div className="row">
        <div className="col"></div>
        <div className="">
        <div className="card text-center mt-5 ">
          <div className="card">
            <div className="card-body">
              <div className="quiz">
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
            </div>
          </div>
        </div>
        </div>
        <div className="col"></div>
      </div>
      </div>
    </div>
  );
};

export default QuizCategories;
