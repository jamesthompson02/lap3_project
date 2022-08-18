import React from 'react';

const CardQuestion = ({ category, question }) => {
  return (
    <div className='card-body'>
      <div className='card-header'>{category}</div>
      <h3 className='card-text mt-5'>{question}</h3>
    </div>
  );
};

export default CardQuestion;
