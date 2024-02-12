import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activePage: "Dashboard",

  loading: false,
  data: [],
  singleProduct: {},
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

// Get Single product data
export const SingleProductData = createAsyncThunk("products/getSingleProductData", async (id) => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const data =  response.data;
    const product = data.find((product) => product.id === id);
    // Set the product data in the state
    return product
    // console.log(product)

  } catch (error) {
    throw error;
  }
});



export const AddProducts = createAsyncThunk("products/addProduct", async (formDataWithFiles) => {
  try {
    const response = await axios.post("http://localhost:3000/products", formDataWithFiles);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Update Product
const updateContact= async (contact)=>{
  const response = await api.put(`/usercontacts/${contact.id}`, contact);
  const {id}=response.data;
  setList(
    list.map((contact)=>{
      return contact.id===id ? {...response.data} : contact;
    })
  )
}


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
    builder.addCase(SingleProductData.fulfilled, (state, action) => {
      state.status = "idle";
      state.singleProduct = action.payload;
    });
  },
});

export const { ActivePage } = adminSlice.actions;

export default adminSlice.reducer;
