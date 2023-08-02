/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import createMockStore from 'redux-mock-store'
import AdminProfile from './AdminProfile'
import Cookies from 'js-cookie'

const mockStore = createMockStore()

test('Admin Profile Component', () => {
  const initialState = {
    user: {
      user: {
        _id: '6447d1ee286d8031b4b113a2',
        first_name: 'Gautam Rangan',
        last_name: 'Pandia Rajan',
        email: 'admin',
        password: '$2a$10$eHvIOl9/mSx8faVHvuO6ZusjfyQOx55q83kQqu6RxNZ5eZjWWfUOG',
        __v: 0,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0N2QxZWUyODZkODAzMWI0YjExM2EyIiwiZW1haWwiOiJhZG1pbiIsImlhdCI6MTY5MDk1Mzk4MywiZXhwIjoxNjkwOTU3NTgzfQ.PuqwaddbA8Brww6thzZYedmm35YrZRvMFMR2n4cooUM'
      }
    }
  }
  Cookies.set('user_id', initialState.user.user._id)
  Cookies.set('token', initialState.user.user.token)
  expect(Cookies.get('user_id')).toEqual(initialState.user.user._id)
  const store = mockStore(initialState)
  render(<Provider store={store}><BrowserRouter><AdminProfile></AdminProfile></BrowserRouter></Provider>)
  screen.debug()
//   const firstName = screen.getByText(initialState.user.user.first_name)
//   expect(firstName).toBeITheDocument()
//   const userName = screen.getByText(initialState.user.user.email)
//   expect(userName).toBeITheDocument()
})
