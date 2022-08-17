import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('Render App', () => {
  beforeEach(() => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  });

  test('Play button exists', () => {
    const navBar = screen.getByTestId('navBar');
    expect(navBar).toBeInTheDocument();
  });
});
