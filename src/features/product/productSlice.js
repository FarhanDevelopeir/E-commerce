import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  fetchCategories,
  getOneProduct,
  getUpdateProduct,
  AddProducts,
} from "./productApi";

const initialState = {
  status: "",
  Products: [],
  filterProducts: [],
  SingleProduct: {},
  selectedProduct: {},
  editProduct: {},
  Categories: [],
  totalItems: 0,
  Category: "Camera",
  isSubmit: false,
  alert: false,
};

export const AddProductsAsync = createAsyncThunk(
  "product/addProduct",
  async (formData) => {
    const data = await AddProducts(formData);
    return data;
  }
);

export const allProductsAsync = createAsyncThunk(
  "product/allProducts",
  async ({ filter, pagination, sort }) => {
    const res = await getAllProducts(filter, pagination, sort);
    return res.data
  }
);

export const getOneProductAsync = createAsyncThunk(
  "product/oneProduct",
  async (id) => {
    const data = await getOneProduct(id);
    return data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/UpdateProduct",
  async ({ formData, Id }) => {
    console.log(Id);
    const data = await getUpdateProduct(formData, Id);
    return data;
  }
);

export const allCategoriesAsync = createAsyncThunk(
  "product/allCategories",
  async () => {
    const data = await fetchCategories();
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.Category = action.payload;
      console.log(state.Category);
    },
    getfilterProducts: (state, action)=>{
      console.log(action.payload.sort._sort)
      state.filterProducts.sort((a, b) => {
        if (action.payload.sort._order === 'asc') {
            return a[action.payload.sort._sort] - b[action.payload.sort._sort];
        } else {
            return b[action.payload.sort._sort] - a[action.payload.sort._sort];
        }
    });
      const getfilterproduct = state.Products.filter((state)=> state.category===action.payload.filter.category)
      state.filterProducts = getfilterproduct 
    },
    productId: (state, action) => {
      const index = state.Products.findIndex(
        (product) => product._id === action.payload
      );
      state.selectedProduct = state.Products[index];
    },
    setSubmitting: (state, action) => {
      if (action.payload === "true") {
        state.isSubmit = true;
      }
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
      console.log(state.alert);
    },
    editproduct: (state, action) => {
      const index = state.Products.findIndex(
        (product) => product._id === action.payload
      );
      state.editProduct = state.Products[index];
    },
    EmptySelectedProduct: (state) => {
      console.log("working");
      state.editProduct = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProductsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(allProductsAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.Products = action.payload.products;
        state.filterProducts = action.payload.products
        state.totalItems = action.payload.totalItems
        console.log(action.payload.totalItems)
      })
      .addCase(allProductsAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(AddProductsAsync.fulfilled, (state, action) => {
        state.Products.push(action.payload);
        state.isSubmit = false;
        state.alert = true;
      })
      
      .addCase(allCategoriesAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.Categories = action.payload;
        console.log("categories==> ", state.Categories);
      })
      .addCase(allCategoriesAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getOneProductAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.SingleProduct = action.payload;
      })
      .addCase(getOneProductAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isSubmit = false;
        state.alert = true;
        // const index = state.Products.findIndex((product)=>product._id === action.payload._id)
      });
  },
});

export const {
  selectCategory,
  productId,
  EmptySelectedProduct,
  editproduct,
  setSubmitting,
  setAlert,
  getfilterProducts,
  
} = productSlice.actions;

export const allFetchedProducts = (state) => state.product1.Products;
export const totalItemsCount = (state) => state.product1.totalItems;
export const singleProductFetched = (state) => state.product1.SingleProduct;
// export const selectedProduct = (state) => state.product1.selectedProduct
export const allFetchedCategories = (state) => state.product1.Categories;
export const selectedCategory = (state) => state.product1.Category;
export const submitState = (state) => state.product1.isSubmit;
export const Alert = (state) => state.product1.alert;
export const filterproducts = (state) => state.product1.filterProducts;


export default productSlice.reducer;
