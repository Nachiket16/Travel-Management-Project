import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: sessionStorage['token'] ? true : false,

    role: sessionStorage['role'],
  },

  reducers: {
    signinRedux: (state, action) => {
      // the user is now signed in
      state.status = true

      sessionStorage['token'] = action.payload['token']
      sessionStorage['role'] = action.payload['Role']
      // console.log('Redux-action.payload ::', action.payload)
    },
    signoutRedux: (state, action) => {
      // the user is signed out
      state.status = false
      // remove the user token and name from sessionStorage
      sessionStorage.clear()
    },
  },
})

export default authSlice.reducer

export const { signinRedux, signoutRedux } = authSlice.actions
