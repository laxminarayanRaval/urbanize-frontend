import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import messageReducer from './slices/messageSlice'

const reducer = { auth: authReducer, message: messageReducer };

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
