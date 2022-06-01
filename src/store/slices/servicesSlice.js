import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const initialState = userService.getServiceList();

export const refreshServiceList = createAsyncThunk(
  "services/refreshServiceList",
  async () => {
    return await userService.getServiceList();
  }
);

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: {
      [refreshServiceList.fulfilled]: (state, action) => {
          console.log(state.service, action.payload);
      }
  }
});

const { reducer, actions } = serviceSlice;

export default reducer;
