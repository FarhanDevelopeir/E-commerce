import { createSlice } from '@reduxjs/toolkit'


// import {pic} from '../counter/pic1'


const initialState = {
  
  products: [],
  singleproduct: [],
  removesingleproduct:[],
  cart: [],
  wishlist:[],
  originalPrice: 0,
  quantity: 1,
  cartbtn:false
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
      const find = state.cart.findIndex((item) => item.id === action.payload.id)
      if (find >= 0) {
        // state.cart[find].quantity += 1
       
      } else {
        const tempvar = { ...action.payload, quantity: 1, originalPrice: action.payload.price,addedToCart: false }

        state.cart.push(tempvar);
        // state.cartbtn=true;

      }
    },
    addtowishlist:(state, action)=>{
      const find = state.wishlist.findIndex(item=>item.id=== action.payload.id)
      if(find>=0){
        
      }else {
        state.wishlist.push(action.payload);
      }
    },
   
    increasequantity: (state, action) => {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        if (product.quantity === 1) {
          // If the quantity is 1, double the price
          product.quantity += 1;
          product.price = product.originalPrice * product.quantity;
        } else {
          // If the quantity is greater than 1, increment quantity and add original price
          product.quantity += 1;
          product.price += product.originalPrice;
        }
      }
    },

    decreasequantity: (state, action) => {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product && product.quantity > 1) {
        // If the quantity is greater than 1, decrement quantity and subtract original price
        product.quantity -= 1;
        product.price -= product.originalPrice;
      } 
      // else if (product && product.quantity === 1) {
      //   // If the quantity is 1, decrement quantity and reset the price to original price
      //   product.quantity -= 1;
      //   product.price = product.originalPrice;
      // }
    },
    
    removefromcart: (state, action) => {
      const updatecart = state.cart.filter(item => item.id !== action.payload.id);
      state.cart = updatecart;
    },
    clearcart:(state, action)=>{
      state.cart=[]
    },
    updateAddedToCart: (state, action) => {
      const { productId, addedToCart } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (product) {
        product.addedToCart = addedToCart;
      }
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {
  displayproducts,
  productview,
  addtocart,
  addtowishlist,
  removefromcart,
  increasequantity,
  decreasequantity,
  productPrice,
  clearcart,
  updateAddedToCart,
} = productSlice.actions



export default productSlice.reducer