import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {},
  reducers: {
    setMessage: (state, action) => ({ message: action.password }),
    clearMessage: () => ({ message: "" }),
  },
});

const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;
