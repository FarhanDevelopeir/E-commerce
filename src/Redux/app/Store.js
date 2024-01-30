import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/counter/ProductSlice";
import AdminSlice from "../../AdminComponents/features/AdminSlice";

export const store = configureStore(
  {
    reducer: {
      product: ProductReducer,
      adminslice: AdminSlice,
    }
  }
);
