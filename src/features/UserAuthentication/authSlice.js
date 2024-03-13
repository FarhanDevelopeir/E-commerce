import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, LoginUser } from "./authApi";
import { useDispatch } from "react-redux";


const initialState = {
  status: "",
  UserData: {},
  isSubmit: false,
  error: ''
};

export const createUserAsync = createAsyncThunk(
  
  "user/createUser",
  async (user,dispatch) => {
    const data = await createUser(user,dispatch);
    
    return data;
   
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/logInUser",
  async (user) => {
    const data = await LoginUser(user);
    return data;
  }
);

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    displayproducts: (state, action) => {
      state.token = action.payload;
    },
    setSubmitting: (state, action) => {
      if (action.payload === "true") {
        state.isSubmit = true;
      }
    },
    setError:(state, action)=>{
      state.error = action.payload
      console.log(state.error)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.UserData = action.payload;
        state.isSubmit = false
        console.log("action => ", state.UserData);
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.UserData = action.payload;
        state.isSubmit = false
        console.log("action => ", state.UserData);
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { setSubmitting, setError } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.UserData;
export const submitState = (state) => state.auth.isSubmit;
export const displayError = (state) => state.auth.error;



export default authSlice.reducer;
