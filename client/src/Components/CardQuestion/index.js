import React from 'react';

const CardQuestion = ({ category, question }) => {
  return (
    <div>
      <div aria-label="Category">{category}</div>
      <div aria-label="Question">{question}</div>
    </div>
  );
};

export default CardQuestion;
