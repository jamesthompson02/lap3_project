import React from 'react';

const Btn = ({handleClick, text}) => {
    return (
        <button role="button" onClick={handleClick} className="btn btn-primary">{text}</button>
    );
}

export default Btn;
