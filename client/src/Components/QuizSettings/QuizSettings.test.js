import { default as QuizSettings } from '.';
import {BrowserRouter as Router} from 'react-router-dom';
/** @jest-environment jsdom */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('QuizSettings', () => {
    let handleClick1 = jest.fn();
    global.alert = jest.fn();
    // let submitForm = jest.fn(e => e.preventDefault());
    // jest.spyOn(QuizSettings, "submitForm").mockImplementation(() => {});
    let display = "flex";
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    beforeEach(() => {
        render(<Router>
                <QuizSettings display={display} handleClick1={handleClick1}/>
              </Router>
        );
    });

    test('it renders a form', () => {
        let form = screen.getByRole('form');
        expect(form).toBeInTheDocument();;
    });

    test('handleClick1 function gets called when goBack button is clicked', () => {
        const button = screen.getAllByRole("button")[0]; 
        userEvent.click(button);
        expect(handleClick1).toHaveBeenCalled();
    });

    test("submitForm function gets called when Submit button is clicked", () => {
        const button = screen.getAllByRole("button")[1];
        userEvent.click(button);
        expect(submitForm).toHaveBeenCalled();
    });

    test("it rejects a room name that contains a space", () => {
        const input = screen.getByRole("textbox");
        const button = screen.getAllByRole("button")[1];
        userEvent.type(input, "test room");
        userEvent.click(button);
        expect(global.alert).toHaveBeenCalled();

    })

    // test("it tries to create a new room called testroom", async () => {
    //     const input = screen.getByRole("textbox");
    //     const button = screen.getAllByRole("button")[1];
    //     userEvent.type(input, "testroom");
    //     userEvent.click(button);
    //     await new Promise((r) => setTimeout(r, 1000));
    //     expect(window.location).toContain("testroom");
        
    // })

    
});