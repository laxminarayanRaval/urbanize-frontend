import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { setMessage } from "./messageSlice";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isAuthenticated: true, user }
  : { isAuthenticated: false, user: null };

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ full_name, email, password }, thunkAPI) => {
    try {
      const response = await authService.signup(full_name, email, password);
      thunkAPI.dispatch(setMessage(response.data?.message));
      return response.data;
    } catch (err) {
      console.log("err", err);
      Object.keys(err.response.data).forEach((key) => {
        thunkAPI.dispatch(setMessage(`${key} : ${err.response.data[key]}`));
      });
      // const message = 
      // (err.response && err.response.data && err.response.data) ||
      // err.message ||
      // err.toString();
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      // fulfilled
      const data = await authService.signin(email, password);
      return { user: data };
    } catch (err) {
      // rejected
      const message =
        (err.response && err.response?.data?.message) || // NOTE: Here i've taken shortcode; this might work
        err.message ||
        err.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  await authService.signout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signup.fulfilled]: (state) => {
      state.isAuthenticated = false;
    },
    [signup.rejected]: (state) => {
      state.isAuthenticated = false;
    },
    [signin.pending]: (state, action) => {
      state.isAuthenticated = false;
    },
    [signin.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [signin.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    [signout.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
