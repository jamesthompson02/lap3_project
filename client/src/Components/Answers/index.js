import React from 'react';

const Answers = ({ answer, id, handleClick }) => {
  return (
      <div className="container mt-3">
        <div className="d-grid gap-3">
        <button className="btn btn-primary btn-block" value={answer} id={id} onClick={handleClick}>
          {answer}
        </button>
      </div>
    </div>
  );
};

export default Answers;
