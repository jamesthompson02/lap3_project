import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RoutesBar, { Routes } from './index';

describe('Routes', () => {
  beforeEach(() => {
    render(<RoutesBar />, { wrapper: MemoryRouter });
  });

  test('should have navbars', () => {
    const navBar = screen.getByTestId('navBar');
    expect(navBar).toBeInTheDocument();
    expect(navBar).toHaveTextContent('Home');
    expect(navBar).toHaveTextContent('About');
    expect(navBar).toHaveTextContent('Quiz');
    expect(navBar).toHaveTextContent('LeaderBoard');
  });
});
