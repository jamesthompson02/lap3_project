import { default as Home } from '.';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {

    test('it renders the title', () => {
        render(<Home />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Welcome to Triviaholic!');
    });

    

}); 