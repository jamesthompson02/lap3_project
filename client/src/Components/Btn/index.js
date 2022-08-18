import React from 'react';

const Btn = ({handleClick, text}) => {
    return (
        <button role="button" onClick={handleClick}>{text}</button>
    );
}

export default Btn;
