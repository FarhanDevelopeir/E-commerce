import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
export const SingleProductData = createAsyncThunk(
  "products/getSingleProductData",
  async (id) => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const data = response.data;
      const product = data.find((product) => product.id === id);
      // Set the product data in the state
      return product;
      // console.log(product)
    } catch (error) {
      throw error;
    }
  }
);

export const AddProducts = createAsyncThunk(
  "products/addProduct",
  async (formDataWithFiles) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        formDataWithFiles
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (formDataWithFiles) => {
    try {
      // Assuming you're sending the updated product data to the server for updating
      const response = await axios.put(
        `http://localhost:3000/products/${formDataWithFiles.id}`, // Assuming you're sending the ID along with other details for updating
        formDataWithFiles
      );
      console.log(response.data);

      return response.data; // Make sure the server responds with the updated product data
    } catch (error) {
      throw error;
    }
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
      state.editProduct={}
    },
    ProductEdit: (state, action) => {
      const index= state.data.findIndex((product)=> product.id ===action.payload)
      state.editProduct=state.data[index]
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
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = "idle";
      const index = state.data.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    });
  },
});

export const { ActivePage, ProductId, EmptySelectedProduct, ProductEdit } = adminSlice.actions;

export default adminSlice.reducer;
