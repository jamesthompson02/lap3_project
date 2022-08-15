import React from 'react';

const Btn = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
}

export default Btn;
