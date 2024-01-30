import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activePage: "Dashboard",
  loading: false,
  data: [],
  error: null,
  status: "idle",
};

// Thunk for making API call
export const fetchData = createAsyncThunk("products/fetchData", async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  } catch (error) {
    throw error;
  }
});

// export const AddProducts = createAsyncThunk("products/fetchData", async () => {
//   try {
//     const response = await axios.post("http://localhost:3000/products");
//     // return response.data;
//   } catch (error) {
//     throw error;
//   }
// });
export const AddProducts = createAsyncThunk("products/addProduct", async (formData) => {
  try {
    const response = await axios.post("http://localhost:3000/products", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const adminSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
    });
  },
});

export const { ActivePage } = adminSlice.actions;

export default adminSlice.reducer;
