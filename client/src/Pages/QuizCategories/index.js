import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './QuizCategories.style.css';

import { Answers, CardQuestion } from '../../Components';

const QuizCategories = () => {
  const [data, setData] = useState({});
  const [answers, setAnswers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
    );

    return { ...response.data.results[0] };
  };

  const grabData = async () => {
    const data = await fetchData();

    const joinedAnswers = [data.correct_answer, ...data.incorrect_answers];

    setData(data);
    setAnswers(joinedAnswers);
  };

  useEffect(() => {
    grabData();
  }, []);

  const handleClick = (e) => {
    const clickedButton = e.target.closest('button');
    const choice = clickedButton.value;

    if (choice === data.correct_answer) {
      clickedButton.classList.add('bgGreen');
    } else {
      clickedButton.classList.add('bgRed');
    }

    grabData();
  };

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
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
              />
            );
          })}
      </div>
    </div>
  );
};

export default QuizCategories;
