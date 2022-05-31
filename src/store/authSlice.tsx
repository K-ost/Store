import { createSlice } from '@reduxjs/toolkit'

export interface authState {
  user: any
  toast: any
}

const initialState: authState = {
  user: null,
  toast: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login
    login: (state, action) => {
      state.user = action.payload
      localStorage.setItem('auth', JSON.stringify(action.payload))
    },

    // Toast
    toast: (state, action) => {
      state.toast = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, toast } = authSlice.actions
export default authSlice.reducer
