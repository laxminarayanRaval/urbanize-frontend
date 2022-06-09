import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { setMessage } from "./messageSlice";

const is_expired = (exp_dt) => new Date() > new Date(exp_dt * 1000);

const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.access) {
    const { token_type, iat, jti, exp, ...rest } = jwtDecode(user.access);
    if (is_expired(exp)) {
      const { exp, ..._ } = jwtDecode(user.refresh);
      if (is_expired(exp)) {
        localStorage.removeItem("user");
        return null;
      }
      try {
        return authService.refreshAuthToken(user.refresh).then((response) => {
          if (response.data)
            localStorage.setItem("user", JSON.stringify(response.data));

          const newUserToken = JSON.parse(response.data);
          const { token_type, iat, jti, exp, ...rest } = jwtDecode(
            newUserToken.access
          );
          return { ...newUserToken, exp, ...rest };
        });
      } catch (e) {
        return null;
      }
    }
    return { ...user, exp, ...rest };
  }
  return null;
};
const user = checkAuth();
const initialState = user
  ? { isAuthenticated: true, user }
  : { isAuthenticated: false, user: null };

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ full_name, email, password, password2 }, thunkAPI) => {
    try {
      const response = await authService.signup(
        full_name,
        email,
        password,
        password2
      );
      thunkAPI.dispatch(setMessage(response.data?.message));
      thunkAPI.dispatch(signin({ email, password }));

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
      const message = Object.keys(err.response.data).forEach((key) => {
        thunkAPI.dispatch(setMessage(`${key} : ${err.response.data[key]}`));
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  await authService.signout();
});

export const updateContacts = createAsyncThunk(
  "auth/updateContacts",
  async ({ password, email, mobile }, thunkAPI) => {
    try {
      debugger;
      const response = await userService.updateContactDetails({
        password,
        email,
        mobile,
      });

      debugger;

      const data = await response.data;
      // console.log("BD: ", data.message);

      thunkAPI.dispatch(setMessage(data.message));

      return { email, mobile };
    } catch (err) {
      const errorMessage = JSON.stringify(err?.response?.data?.message)
        .replace(/\[|]|{|}/g, " ")
        // .replaceAll(",", "\n")
        .split(":")[1];
        console.log(errorMessage)
      thunkAPI.dispatch(setMessage(errorMessage));
      return thunkAPI.rejectWithValue();
    }
  }
);

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
    [updateContacts.fulfilled]: (state, action) => {
      state.user.email = action.payload.email;
      state.user.mobile = action.payload.mobile;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
