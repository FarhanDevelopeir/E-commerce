import { createSlice } from '@reduxjs/toolkit'

// import {pic} from '../counter/pic1'

const initialState = {
  products:[],
  singleproduct:[],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    displayproducts: (state, actions)=>{
      state.products= actions.payload;
    },
    productview: (state, action) => {
      state.singleproduct = action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { displayproducts,productview} = productSlice.actions

export default productSlice.reducer