import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, fetchCategories, getOneProduct } from "./productApi";


const initialState = {
    status: '',
    Products: [],
    SingleProduct : {},
    Categories: [],
    Category: "women's clothing"
};


export const allProductsAsync = createAsyncThunk(
    "product/allProducts",
    async ({filter}) => {
        const data = await getAllProducts(filter)
        return data
    }
)

export const getOneProductAsync = createAsyncThunk(
    "product/oneProduct",
    async(id) => {
        const data = await getOneProduct(id)
        return data
    }
)


export const allCategoriesAsync = createAsyncThunk(
    "product/allCategories",
    async () => {
        const data = await fetchCategories()
        return data
    }
)


export const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        selectCategory: (state, action) => {
            state.Category = action.payload
            console.log(state.Category)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(allProductsAsync.pending, (state) => {
            state.status = 'Loading'
        })
        .addCase(allProductsAsync.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.Products = action.payload
        })
        .addCase(allProductsAsync.rejected, (state) => {
            state.status = 'rejected'
        })
        .addCase(allCategoriesAsync.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.Categories = action.payload
            console.log("categories==> ",state.Categories)
        })
        .addCase(allCategoriesAsync.rejected, (state) => {
            state.status = 'rejected'
        })
        .addCase(getOneProductAsync.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.SingleProduct = action.payload
        })
        .addCase(getOneProductAsync.rejected, (state) => {
            state.status = 'rejected'
        })
    }
});

export const { selectCategory } = productSlice.actions


export const allFetchedProducts = (state) => state.product1.Products
export const singleProductFetched = (state) => state.product1.SingleProduct
export const allFetchedCategories = (state) => state.product1.Categories
export const selectedCategory = (state) => state.product1.Category


export default productSlice.reducer