/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'

test('renders', () => {
  render(<App></App>)
  const linkElement = screen.getByText(/Poll App/i)
  expect(linkElement).toBeInTheDocument()
})
