import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddProducts } from "./AdminApis";

const initialState = {
  activePage: "Dashboard",
  loading: false,
  data: [],
  singleProduct: {},
  selectedProduct: {},
  editProduct: {},
  error: null,
  status: "idle",
};


export const AddProductsAsync = createAsyncThunk(
  "products/addProduct",
  async (formData) => {
   const data = await AddProducts(formData)
   return data
  }
);



export const adminSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    ProductId: (state, action) => {
      const index= state.data.findIndex((product)=> product.id ===action.payload)
      state.selectedProduct=state.data[index]
    },
    EmptySelectedProduct : (state)=>{
      console.log('working')
      state.editProduct={}
    },
    ProductEdit: (state, action) => {
      const index= state.data.findIndex((product)=> product.id ===action.payload)
      state.editProduct=state.data[index]
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AddProductsAsync.fulfilled, (state, action)=>{
      state.data.push(action.payload);
    })  
  },
});

export const { ActivePage, ProductId, EmptySelectedProduct, ProductEdit } = adminSlice.actions;

export default adminSlice.reducer;
