import React from 'react';
import './styles.scss'
const QuizResults = ({results}) => {

    return (
        <div id='lobby-scores'>
            <h1>Scores</h1>
            <ul id='result-list'>
            {results.map(user => <li>
                <span className='result-username'>{user.name}</span>
                <span className='result-score'>{user.score}</span>
            </li>)}
            </ul>
            
        </div>
    );
}

export default QuizResults;
