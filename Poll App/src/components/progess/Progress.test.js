/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'

import React from 'react'
import ProgressBar from './ProgressBar'

test('renders', () => {
  const percent = 75
  render(<ProgressBar data={percent}></ProgressBar>)
  const linkElement = screen.getByText(percent.toString() + '%')
  expect(linkElement).toBeInTheDocument()
})
