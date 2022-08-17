import React from 'react';

const Answers = ({ answer, id, handleClick }) => {
  return (
    <div>
      <button className="bg" value={answer} id={id} onClick={handleClick}>
        {answer}
      </button>
    </div>
  );
};

export default Answers;
