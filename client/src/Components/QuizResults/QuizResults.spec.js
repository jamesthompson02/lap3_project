import QuizResults from './index.js'
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('Testing the quiz results ', () => {
    let results = [
        {name: "matt", score: 1500},
        {name: "jeff", score: 3000},
        {name: "frank", score: 2543},
    ]
    beforeEach(() => {
        render( <QuizResults results={results} />)
    });

    it('basic html components get added to the DOM', ()=>{
        let parentDiv = screen.getByRole('lobbyDiv')
        expect(parentDiv).toBeInTheDocument();
        expect(parentDiv.childElementCount).toEqual(2)
    })
    it('creates a list element for each result passed in to the component', () => {
        let resultList = screen.getByLabelText('scoreList')
        expect(resultList).toBeInTheDocument();
        expect(resultList.childElementCount).toEqual(results.length)
        let label = screen.getAllByLabelText('username')[0]
        expect(label.textContent).toEqual(results[0].name)
    })



});
