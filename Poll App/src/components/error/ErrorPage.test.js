/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'

test('renders', () => {
  render(<BrowserRouter><ErrorPage></ErrorPage></BrowserRouter>)
  const linkElement = screen.getByText(/Error 404 Page not found/i)
  expect(linkElement).toBeInTheDocument()
})
