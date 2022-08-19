import React from 'react';
import './styles.scss'
const QuizResults = ({results}) => {

    return (
        <div role="lobbyDiv" id='lobby-scores' style={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center"}}>
            <h1>Scores</h1>
            <ul aria-label='scoreList' id='result-list' >
            {results.map(user => <li key={results.indexOf(user)} className='list-item'>
                <span aria-label='username' className='result-username' style={{marginRight:"2rem", fontSize:"1.25rem"}}>{user.name} : </span>
                <span className='result-score' style={{fontSize:"1.25rem"}}>{user.score}</span>
            </li>)}
            </ul>
            
        </div>
    );
}

export default QuizResults;
