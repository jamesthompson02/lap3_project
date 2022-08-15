import React from 'react';
import Btn from '../Btn';

const StarterQuizDiv = ({handleClick1, handleClick2, display}) => {
    return (
        <div style={{display: display, flexDirection: "column", alignItems: "center",border: "1px solid black", borderRadius: "15px", maxWidth: "400px"}} >
            <h2>Test Your Knowledge!</h2>
            <p>Create a quiz and compete against your friends or join someone else's quiz</p>
            <div>
                <Btn text="Create New Quiz!" handleClick={handleClick1} />
                <Btn text="Find a Quiz!" handleClick={handleClick2} />
            </div>
            
        </div>
    );
}

export default StarterQuizDiv;
