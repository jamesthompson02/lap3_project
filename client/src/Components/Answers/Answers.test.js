import { default as Answers } from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('Answers', () => {
    let handleClick = jest.fn();

    beforeEach(() => {
        let text = "answer";
        handleClick = jest.fn();
        render(<Answers answer={text} handleClick={handleClick} />);
    });

    test('it gets rendered on the page', () => {
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    })

    test('that it contains the word "answer"', () => {
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("answer");
    });

    test('it calls the handleClick function when clicked', () => {
        const button = screen.getByRole("button");
        userEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });
});