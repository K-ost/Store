import { createSlice } from '@reduxjs/toolkit'
import { productType } from '../interfaces'

export interface cartState {
  orders: productType[]
}

const initialState: cartState = {
  orders: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    // Load orders reducer
    loadOrders: (state, action) => {
      state.orders = action.payload
    },

    // Add to cart reducer
    addOrder: (state, action) => {
      let newOrder = { ...action.payload, count: 1 }
      let isOrderExist = state.orders.find(el => el.id === action.payload.id)
      if (!isOrderExist) {
        state.orders.push(newOrder)
      } else {
        state.orders.map(el => {
          if (el.id === action.payload.id) {
            el.count! += 1
          }
          return el
        })
      }
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    // Change count of order reducer
    changeOrder: (state, action) => {
      let { count, id } = action.payload
      state.orders.map(order => {
        if (order.id === id) {
          order.count = Number(count)
        }
        return order
      })
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    // Remove order reducer
    removeOrder: (state, action) => {
      let id = action.payload
      state.orders = state.orders.filter(order => order.id !== id)
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    // Reset orders
    resetOrders: (state) => {
      state.orders = []
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { loadOrders, addOrder, changeOrder, removeOrder, resetOrders } = cartSlice.actions
export default cartSlice.reducer
