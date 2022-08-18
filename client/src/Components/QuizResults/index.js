import React from 'react';
//import './styles.scss'
const QuizResults = ({results}) => {

    return (
        <div role="lobbyDiv" id='lobby-scores'>
            <h1>Scores</h1>
            <ul aria-label='scoreList' id='result-list' >
            {results.map(user => <li key={results.indexOf(user)}>
                <span aria-label='username' className='result-username'>{user.name}</span>
                <span className='result-score'>{user.score}</span>
            </li>)}
            </ul>
            
        </div>
    );
}

export default QuizResults;
