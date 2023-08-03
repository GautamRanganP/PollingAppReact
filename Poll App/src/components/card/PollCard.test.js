/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PollCard from './PollCard'
import { Provider } from 'react-redux'
import createMockStore from 'redux-mock-store'

const mockStore = createMockStore()

test('Poll Card Component', () => {
  const mockData = {
    _id: '64a28b09f79c97e7b3572cbd',
    title: 'Real Madrid vs Barcelona',
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
  const initialState = { user: null }
  const store = mockStore(initialState)

  render(<Provider store={store}><BrowserRouter><PollCard data={mockData}></PollCard></BrowserRouter></Provider>)
  const title = screen.getByText(mockData.title)
  expect(title).toBeInTheDocument()

  const description = screen.getByText(mockData.description)
  expect(description).toBeInTheDocument()
})
