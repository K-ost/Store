import { createSlice } from '@reduxjs/toolkit'

export interface filterState {
  sort: string
  category: string[]
  priceFrom: string
  priceTo: string
  price: string
  reset: boolean
  page: string
  cpu: string[]
}

const initialState: filterState = {
  sort: '',
  category: [],
  priceFrom: '',
  priceTo: '',
  price: '',
  reset: true,
  page: '1',
  cpu: []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    // Sort
    setSort: (state, action) => {
      state.sort = action.payload
    },

    // Filter
    setFilter: (state, action) => {
      state.reset = false
      if ( !state[action.payload.cat].includes(action.payload.data) ) {
        state[action.payload.cat] = [action.payload.data, ...state[action.payload.cat]].sort()
      } else {
        state[action.payload.cat] = state[action.payload.cat].filter(el => el !== action.payload.data)
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
      state.cpu = []
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
export const { setSort, setPriceFrom, setPriceTo, resetFilters, paginate, setFilter } = filterSlice.actions
export default filterSlice.reducer
