/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import App from './App'
import createMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import React from 'react'

const mockStore = createMockStore()

test('renders', () => {
  const initialState = { user: null }
  const store = mockStore(initialState)
  render(<Provider store = { store }><App></App></Provider>)
  screen.debug()
  const linkElement = screen.getByText(/Poll App/i)
  expect(linkElement).toBeInTheDocument()
})
