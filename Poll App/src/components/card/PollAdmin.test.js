/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PollAdmin from './PollAdmin'

test('Poll admin Component', () => {
  const mockData = {
    _id: '64a28b09f79c97e7b3572cbd',
    title: 'Real Madrid vs Barcelona ',
    description: 'Liga FiFa Leagueuh',
    startdate: '03/07/2023',
    enddate: '22/07/2023',
    votes: 28,
    optionone: 'Real Madrid',
    optiontwo: 'Barcelona2',
    optiononevote: 10,
    optiontwovote: 18,
    __v: 0
  }

  render(<BrowserRouter><PollAdmin data={mockData}></PollAdmin></BrowserRouter>)
  const editPollButton = screen.getByRole('button', { name: /Edit/i })
  expect(editPollButton).toBeInTheDocument()

  const deletePollButton = screen.getByRole('button', { name: /Delete/i })
  expect(deletePollButton).toBeInTheDocument()

  const resetPollButton = screen.getByRole('button', { name: /Reset/i })
  expect(resetPollButton).toBeInTheDocument()
})
