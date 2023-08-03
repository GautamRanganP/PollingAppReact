import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginAdmin  from './LoginAdmin'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import createMockStore from 'redux-mock-store'

const mockStore = createMockStore()

describe('Admin Create component', () => {
  it('should update the state on input change', () => {
    const initialState = { user: null }
    const store = mockStore(initialState)
    render(<Provider store={store}><BrowserRouter><LoginAdmin/></BrowserRouter></Provider>);
    const nameInput = screen.getByLabelText('Password *');
    const emailInput = screen.getByLabelText('Email Address *');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

//   it('should call handleSubmit on form submission', () => {
//     const handleSubmit = jest.fn();
//     render(<FormComponent onSubmit={handleSubmit} />);
//     const form = screen.getByRole('form');

//     fireEvent.submit(form);

//     expect(handleSubmit).toHaveBeenCalled();
//   });

//   it('should display the correct labels and submit button', () => {
//     render(<FormComponent />);
//     const nameLabel = screen.getByLabelText('Name');
//     const emailLabel = screen.getByLabelText('Email');
//     const submitButton = screen.getByRole('button', { name: 'Submit' });

//     expect(nameLabel).toBeInTheDocument();
//     expect(emailLabel).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });
});
