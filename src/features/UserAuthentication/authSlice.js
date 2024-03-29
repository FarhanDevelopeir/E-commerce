import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, LoginUser, checkUser } from "./authApi";
import { useDispatch } from "react-redux";


const initialState = {
  status: "",
  UserData: {},
  isSubmit: false,
  error: '',
  userChecked: false
};

export const createUserAsync = createAsyncThunk(

  "user/createUser",
  async (user, dispatch) => {
    const data = await createUser(user, dispatch);

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

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async () => {
    const data = await checkUser();
    return data
  }
)

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
    setError: (state, action) => {
      state.error = action.payload
      console.log(state.error)
    },
    setUser: (state, action) => {
      state.UserData = action.payload;
    },
    clearUser: (state) => {
      state.UserData = {};
    },
    emptyError : (state)=>{
      state.error ='';
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
        state.isSubmit = false;
        state.error = '';
        console.log("action => ", state.UserData);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "This user already exists"
        
        state.isSubmit = false

      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.UserData = action.payload;
        state.isSubmit = false
        console.log("action => ", action.payload);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log(action.payload)
        
        state.error = "wrong email or password"
        state.isSubmit = false
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.UserData = action.payload
        console.log('action => ', state.UserData)
        state.userChecked = true
      })
      .addCase(checkUserAsync.rejected, (state) => {
        state.status = 'rejected'
        state.userChecked = true
      })
  },
});

export const { setSubmitting, setError, emptyError } = authSlice.actions;

export const { setUser, clearUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.UserData;
export const submitState = (state) => state.auth.isSubmit;
export const displayError = (state) => state.auth.error;

export const userCheckedStatus = (state) => state.auth.userChecked


export default authSlice.reducer;
