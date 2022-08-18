import { default as RoomCheckBox } from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('RoomCheckBox', () => {

    beforeEach(() => {
        render(<RoomCheckBox />);
    });

    test('it gets rendered on the page', () => {
        const input = screen.getByRole("checkbox");
        expect(input).toBeInTheDocument();
    })

    test('checkbox get checked after user clicks it', () => {
        const input = screen.getByRole("checkbox");
        userEvent.click(input);
        expect(input).toBeChecked();
    });

   
});