import { default as CardQuestion } from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('CardQuestion', () => {

    beforeEach(() => {
        let text = "General";
        let question = "What?";
        render(<CardQuestion category={text} question={question}/>);
    });

    test('the category gets rendered on the page', () => {
        const category = screen.getByLabelText("Category");
        expect(category.textContent).toBe('General');
    })

    test('that the question gets rendered on the page', () => {
        const question = screen.getByLabelText("Question");
        expect(question).toHaveTextContent("What?");
    });

    
});