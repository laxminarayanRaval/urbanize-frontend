import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import themeReducer from "./slices/themeSlice";
import servicesReducer from "./slices/servicesSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  theme: themeReducer,
  services: servicesReducer
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
