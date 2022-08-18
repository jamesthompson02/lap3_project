import React from 'react';
import Btn from '../Btn';

const StarterQuizDiv = ({handleClick1, handleClick2, display}) => {
    return (
        <div role="starterQuizDiv" style={{display: display, justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 100px - 56px)", border: "none"}} >
            <div style={{display: "flex", flexDirection: "column", alignItems: "center",border: "1px solid black", borderRadius: "15px", maxWidth: "350px", padding: "2rem"}}>
                <h2 style={{textAlign: "center"}}>Test Your Knowledge!</h2>
                <p style={{textAlign: "center"}}>Create a quiz and compete against your friends or join someone else's quiz!</p>
                <div>
                    <Btn text="Create New Quiz!" handleClick={handleClick1} />
                    <Btn text="Find a Quiz!" handleClick={handleClick2} />
                </div>

            </div>
            
        
        </div>
    );
}

export default StarterQuizDiv;
