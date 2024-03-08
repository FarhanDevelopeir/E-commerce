import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrder,
} from "./checkoutApi";

const initialState = {
  userOrders: [],
  currentOrder: {},
  ordersList: [],
  status: "",
  address: {},
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    const data = await createOrder(orderData);
    return data;
  }
);

export const getUserOrdersAsync = createAsyncThunk(
  "order/getUserOrders",
  async () => {
    const data = await getUserOrders();
    return data;
  }
);

export const getAllOrdersAsync = createAsyncThunk(
  "order/getAllOrders",

  async () => {
    const data = await getAllOrders();
    console.log(data);
    return data;
  }
);

export const updateOrderAsync = createAsyncThunk(
    "order/updateOrder",
  
    async (updateData) => {
      const data = await updateOrder(updateData);
      return data;
    }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    handleAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userOrders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.ordersList = action.payload;
      })
      .addCase(getUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userOrders = action.payload;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";      
        console.log(action.payload)     
      });
  },
});

export const { handleAddress } = orderSlice.actions;

export const addressState = (state) => state.order.address;
export const fetchedUserOrder = (state) => state.order.currentOrder;
export const fetchedUserAllOrders = (state) => state.order.userOrders;
export const fetchedAllOrders = (state) => state.order.ordersList;

export default orderSlice.reducer;

// .addCase(getAllOrdersAsync.pending, (state) => {
//     //         state.status = 'loading'
//     //     })
//     //     .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
//     //         state.status = 'fulfilled'
//     //         state.ordersList = action.payload
//     //     })
//     //     .addCase(getUserOrdersAsync.pending, (state) => {
//     //         state.status = 'loading'
//     //     })
//     //     .addCase(getUserOrdersAsync.fulfilled, (state, action) => {
//     //         state.status = 'fulfilled'
//     //         state.userOrders = action.payload
//     //     })
//     //     .addCase(updateOrderAsync.pending, (state) => {
//     //         state.status = 'loading'
//     //     })
//     //     .addCase(updateOrderAsync.fulfilled, (state, action) => {
//     //         state.status = 'fulfilled'
//     //         state.userOrders = action.payload
//     //     }) }
