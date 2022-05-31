import { createSlice } from '@reduxjs/toolkit'

export interface filterState {
  sort: string
  category: string[]
  priceFrom: string
  priceTo: string
  price: string
  reset: boolean
  page: string
}

const initialState: filterState = {
  sort: '',
  category: [],
  priceFrom: '',
  priceTo: '',
  price: '',
  reset: true,
  page: '1'
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    // Sort
    setSort: (state, action) => {
      state.sort = action.payload
    },

    // Filter / setCategory
    setCategory: (state, action) => {
      state.reset = false
      if ( !state.category.includes(action.payload) ) {
        state.category = [action.payload, ...state.category].sort()
      } else {
        state.category = state.category.filter(el => el !== action.payload)
      }
    },

    // setPriceFrom
    setPriceFrom: (state, action) => {
      state.reset = false
      state.priceFrom = action.payload
      state.price = (state.priceFrom.length && state.priceTo.length) ? `${state.priceFrom}-${state.priceTo}` : ''
    },
    
    // setPriceTo
    setPriceTo: (state, action) => {
      state.reset = false
      state.priceTo = action.payload
      state.price = (state.priceFrom.length && state.priceTo.length) ? `${state.priceFrom}-${state.priceTo}` : ''
    },

    // resetFilters
    resetFilters: (state) => {
      state.category = []
      state.price = ''
      state.priceFrom = ''
      state.priceTo = ''
      state.reset = true
    },

    // paginate
    paginate: (state, action) => {
      state.page = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setSort, setCategory, setPriceFrom, setPriceTo, resetFilters, paginate } = filterSlice.actions
export default filterSlice.reducer
