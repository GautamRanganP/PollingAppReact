/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import createMockStore from 'redux-mock-store'
import Navbar from './Navbar'

const mockStore = createMockStore()

test('Navbar Component', () => {
  const initialState = { user: null }
  const store = mockStore(initialState)
  render(<Provider store={store}><BrowserRouter><Navbar></Navbar></BrowserRouter></Provider>)
  const navBrand = screen.getByText(/Poll App/i)
  expect(navBrand).toBeInTheDocument()
})
