import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from '../features/counter/ProductSlice'

export const store = configureStore({
  reducer: {
    product : ProductReducer,
  },
})