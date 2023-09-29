import { createSlice } from '@reduxjs/toolkit'

// import {pic} from '../counter/pic1'

const initialState = {
  products: [],
  singleproduct: [],
  cart: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    displayproducts: (state, actions) => {
      state.products = actions.payload;
    },
    productview: (state, action) => {
      state.singleproduct = action.payload
    },
    addtocart: (state, action) => {
      // const find =state.cart.findIndex((item)=>item.id===action.payload.id)
      // if(find>=0){

      // }
      state.cart.push(action.payload);
    }

  },
})

// Action creators are generated for each case reducer function
export const {
  displayproducts,
  productview,
  addtocart,
} = productSlice.actions

export default productSlice.reducer