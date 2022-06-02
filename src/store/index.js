import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import contentReducer from "./slices/contentSlice";
import messageReducer from "./slices/messageSlice";
import themeReducer from "./slices/themeSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  theme: themeReducer,
  content: contentReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
