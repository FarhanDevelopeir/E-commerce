import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, LoginUser } from "./authApi";

const initialState = {
    status: '',
    UserData: {}
};

export const createUserAsync = createAsyncThunk(
    "user/createUser",
    async (user) => {
        const data = await createUser(user);
        return data
    }
);

export const loginUserAsync = createAsyncThunk(
    "user/logInUser",
    async (user) => {
        const data = await LoginUser(user);
        return data
    }
)

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        displayproducts: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createUserAsync.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.UserData = action.payload
            console.log('action => ', state.UserData)
        })
        .addCase(createUserAsync.rejected, (state) => {
            state.status = 'rejected'
        })
        .addCase(loginUserAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(loginUserAsync.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.UserData = action.payload
            console.log('action => ', state.UserData)
        })
        .addCase(loginUserAsync.rejected, (state) => {
            state.status = 'rejected'
        })
    }

});

export const selectLoggedInUser = (state) => state.auth.UserData


export default authSlice.reducer