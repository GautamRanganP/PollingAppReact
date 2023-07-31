import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminPage } from './AdminPage';


jest.mock('ws');

describe('AdminPage Component', () => {
  test('should render "Create Poll" button', () => {
    render(
      <Router>
        <AdminPage />
      </Router>
    );

    const createPollButton = screen.getByRole('button', { name: /Create Poll/i });
    expect(createPollButton).toBeInTheDocument();
  });

});




