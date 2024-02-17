import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/counter/ProductSlice";
import AdminSlice from "../../AdminComponents/features/AdminSlice";
import authReducer from "../../features/UserAuthentication/authSlice";
import producReducer from "../../features/product/productSlice";
import cartReducer from "../../features/cart/cartSlice";


export const store = configureStore(
  {
    reducer: {
      product: ProductReducer,
      product1: producReducer,
      adminslice: AdminSlice,
      auth: authReducer,
      cart: cartReducer
    }
  }
);
