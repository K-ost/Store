import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import authSlice from './authSlice'
import filterSlice from './filterSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    filter: filterSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
