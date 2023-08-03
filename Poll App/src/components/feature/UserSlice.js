import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload
      state.user = user
      console.log('state', state.user)
    },
    removeUser: (state) => {
      state.user = null
      console.log('remove state', state.user)
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
