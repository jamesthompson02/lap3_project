import { default as Btn } from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('Btn', () => {
    let handleClick;
    beforeEach(() => {
        let text = "Submit";
        handleClick = jest.fn();
        render(<Btn text={text} handleClick={handleClick}/>);
    });

    test('it gets rendered on the page', () => {
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    })

    test('that it contains the word "Submit"', () => {
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("Submit");
    });

    test('it calls the handleClick function when clicked', () => {
        const button = screen.getByRole("button");
        userEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });
});