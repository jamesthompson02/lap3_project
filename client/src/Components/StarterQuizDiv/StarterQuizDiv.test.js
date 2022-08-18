import { default as StarterQuizDiv } from '.';
import { default as Btn } from './../Btn';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('StarterQuizDiv', () => {
    let handleClick1 = jest.fn();
    let handleClick2 = jest.fn();
    let display = "flex";

    beforeEach(() => {
        render(<StarterQuizDiv display={display} handleClick1={handleClick1} handleClick2={handleClick2} />);
    });

    test('it gets rendered on the page', () => {
        const starterQuizDiv = screen.getByRole("starterQuizDiv");
        expect(starterQuizDiv).toBeInTheDocument();
    })

    
    test('that handleClick1 is called when the first button is clicked', () => {
        const button = screen.getAllByRole("button")[0];
        userEvent.click(button);
        expect(handleClick1).toHaveBeenCalled();
    });

    test('that handleClick2 is called when the second button is clicked', () => {
        const button = screen.getAllByRole("button")[1];
        userEvent.click(button);
        expect(handleClick2).toHaveBeenCalled();
    })

});