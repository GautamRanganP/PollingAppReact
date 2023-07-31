import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import React from 'react'

test('renders', () => {
  render(<Provider store = { store }><App></App></Provider>)
  screen.debug(); 
  const linkElement = screen.getByText(/Poll App/i)
  expect(linkElement).toBeInTheDocument()
})
