import React from 'react';

const CardQuestion = ({ category, question }) => {
  return (
    <div>
      <div>{category}</div>
      <div>{question}</div>
    </div>
  );
};

export default CardQuestion;
