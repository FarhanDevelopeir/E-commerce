import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  allCartData,
  addtocart,
  updatecart,
  deletecart,
  deletefullcart,
} from "./cartApi";

const initialState = {
  TotalItems: 0,
  CartList: [],
  status: "",
  isSubmit: false,
  alert: false,
};

export const addCartAsync = createAsyncThunk(
  "cart/addCart",
  async ({cartData, token}) => {
    const data = await addtocart(cartData, token);
    return data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async ({cartData, token}) => {
    const data = await updatecart(cartData, token);
    return data;
  }
);

export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async ({cartData, token}) => {
    const data = await deletecart(cartData, token);
    return data;
  }
);

export const deletefullCartAsync = createAsyncThunk(
  "cart/deletefullCart",
  async (id) => {
    const data = await deletefullcart(id);
    return data;
  }
);

export const allCartDataAsync = createAsyncThunk(
    "cart/allCart",
    async (token) => {
        const data = await allCartData(token)
        return data
    }
)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.CartList = [];
    },
    addQuantity: (state, action) => {
      state.TotalItems = action.payload;
    },
    setSubmitting: (state, action) => {
        state.isSubmit = action.payload
    },
    setAlert: (state, action) => {
        state.alert = action.payload;
        console.log(state.alert);
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(addCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.CartList = action.payload;
        state.isSubmit = false
        state.alert = true
      })
      .addCase(addCartAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(allCartDataAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.CartList = action.payload;
      })
      .addCase(allCartDataAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        action.payload.products.forEach((payloadProduct) => {
          const productIndex = state.CartList.products.findIndex(
            (product) => product.productId._id === payloadProduct.productId
          );
          if (productIndex !== -1) {
            state.CartList.products[productIndex].quantity =
              payloadProduct.quantity;
          } else {
            console.log("No matching product found for:", payloadProduct);
          }
        });
        state.isSubmit = false
        state.CartList.bill = action.payload.bill;
      })
      .addCase(updateCartAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        const productIndex = state.CartList.products.findIndex(
          (product) => product.productId._id === action.payload.item.productId
        );
        if (productIndex !== -1) {
          state.CartList.products.splice(productIndex, 1);
        } else {
          console.log("No matching product found");
        }
        state.CartList.bill = action.payload.bill;
      })
      .addCase(deleteCartAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(deletefullCartAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        state.CartList = [];
      })
      .addCase(deletefullCartAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { addQuantity, setSubmitting, setAlert } = cartSlice.actions;

export const allFetchedCartData = (state) => state.cart.CartList;
export const totalItemsInCart = (state) => state.cart.TotalItems;
export const IsSubmitting = (state) => state.cart.isSubmit;
export const IsAlert = (state) => state.cart.alert;


export default cartSlice.reducer;
