import { default as LobbyRoom } from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

describe('CardQuestion', () => {
    let userList = ["Sam", "Matt", "James", "Josh", "Hassan"];
    let roomId = "Batman";
    let display = "flex";
    let hostFunc = jest.fn();
    let username = "Sam";

    beforeEach(() => {
        render(<LobbyRoom roomName={roomId} userList={userList} hostFunc={hostFunc} display={display} username={username}/>);
    });

    test("it renders the room name Batman upon loading", () => {
        const header = screen.getByRole("heading");
        expect(header.textContent).toContain("Batman");
    })

    test("it renders the user list", () => {
        const list = screen.getByLabelText("listOfUsers");
        expect(list.children[3]).toHaveTextContent("James");

    })

    test("if hostFunc gets called", () => {
  
        expect(hostFunc).toHaveBeenCalled();
    })







    // test('the category gets rendered on the page', () => {
    //     const category = screen.getByLabelText("Category");
    //     expect(category.textContent).toBe('General');
    // })

    // test('that the question gets rendered on the page', () => {
    //     const question = screen.getByLabelText("Question");
    //     expect(question).toHaveTextContent("What?");
    // });

    
});