import { default as JoinRoomDiv } from '.';
import { default as RoomCheckBox } from '../JoinRoomDiv';
import { screen, render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from "axios";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


describe("JoinRoomDiv", () => {
    let display = "flex";
    let btnFunction = jest.fn();
    // jest.mock('axios', () => jest.fn(() => Promise.resolve('userlist')));
    // jest.mock('axios');
    // // jest.mock("getAllRooms");
    // let getAllRooms = jest.fn();
    // const rooms = ["room1", "room2"];

    // let newKeyGenerator = jest.fn();
    //

    // const getRooms = rooms.map(room => {

    //     const newKey = newKeyGenerator();

    //     return(
    //         <RoomCheckBox key={newKey} room={room} />
    //     )
    // });

    beforeEach(() => {
        render(<Router>
            <JoinRoomDiv display={display} handleClick1={btnFunction}/>
        </Router>
        );
    });
    
    test("it gets rendered on the page", () => {
        const header = screen.getByLabelText("searchHeader");
        expect(header).toHaveTextContent("Search for Rooms:");
    })

    test("btnFunction gets called when go back button clicked", () => {
        const button = screen.getAllByRole("button")[0];
        userEvent.click(button);
        expect(btnFunction).toHaveBeenCalled();
    })

    // test("user should be able to filter user list when typing", () => {
    //     const input = screen.getByRole("textbox");
    //     const container = screen.getByLabelText("roomsContainer");
    //     // userEvent.type(input, "room1");
    //     expect(container.children.length).toBe(2);


    // })

    // test("it should make an axios get request upon rendering", async () => {
    //     const userList = {users: ["user1", "user2"]};
    //     axios.get.mockResolvedValueOnce(userList);
    //     const result = await getAllRooms();
    //     expect(axios.get).toHaveBeenCalledWith("https://lap3-project.herokuapp.com/rooms/");
    //     expect(result).toEqual(userList);
    // })




    // test()
})