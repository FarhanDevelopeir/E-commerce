import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { allCartData, addtocart, updatecart, deletecart } from "./cartApi";

const initialState = {
    CartList: [],
    status: ''

}


export const addCartAsync = createAsyncThunk(
    "cart/addCart",
    async (cartData) => {
        const data = await addtocart(cartData)
        return data
    }
);

export const updateCartAsync = createAsyncThunk(
    "cart/updateCart",
    async (cartData) => {
        const data = await updatecart(cartData)
        return data
    }
);

export const deleteCartAsync = createAsyncThunk(
    "cart/deleteCart",
    async (cartData) => {
        const data = await deletecart(cartData)
        return data
    }
);


export const allCartDataAsync = createAsyncThunk(
    "cart/allCart",
    async (userId) => {
        const data = await allCartData(userId)
        return data
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.CartList = []
        }
    },
    extraReducers: (buider) => {
        buider
            .addCase(addCartAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addCartAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.CartList = action.payload

            })
            .addCase(addCartAsync.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(allCartDataAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.CartList = action.payload
            })
            .addCase(allCartDataAsync.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                action.payload.products.forEach((payloadProduct) => {
                    const productIndex = state.CartList.products.findIndex((product) => product.productId._id === payloadProduct.productId);
                    if (productIndex !== -1) {
                        state.CartList.products[productIndex].quantity = payloadProduct.quantity
                    } else {
                        console.log("No matching product found for:", payloadProduct);
                    }
                });
                state.CartList.bill = action.payload.bill
            })
            .addCase(updateCartAsync.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(deleteCartAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                console.log(action.payload)
                const productIndex = state.CartList.products.findIndex((product) => product.productId._id === action.payload.item.productId);
                if (productIndex !== -1) {
                    state.CartList.products.splice(productIndex, 1);
                } else {
                    console.log("No matching product found");
                }
                state.CartList.bill = action.payload.bill
            })
            .addCase(deleteCartAsync.rejected, (state) => {
                state.status = 'rejected'
            })
    }
});


export const allFetchedCartData = (state) => state.cart.CartList



export default cartSlice.reducer;