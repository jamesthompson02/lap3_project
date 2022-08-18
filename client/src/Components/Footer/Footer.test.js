import { default as Footer } from '.';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("Footer", () => {
     

    beforeEach(() => {
        render(< Footer/>);
    });


    test("it renders the footer on the page", () => {
        let footer = screen.getByRole("footer");
        expect(footer).toBeInTheDocument();
    })

})