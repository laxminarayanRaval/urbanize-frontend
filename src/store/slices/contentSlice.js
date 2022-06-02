import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

export const getService = createAsyncThunk("content/getService", async () => {
  const response = await userService.getServiceList().then(
    (response) => {
    //   console.log("Redux-ser :", response?.data);
      return response.status == "200" ? response.data : [];
    },
    (error) => {
      console.log(error);
    }
  );
//   console.log("getSer response:", response);
  return response;
});
export const getSubservice = createAsyncThunk(
  "content/subservices",
  async () => {
    const response = await userService.getSubservicesList().then(
      (response) => {
        // console.log("Redux-subSer :", response?.data);
        return response.status == "200" ? response.data : [];
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log("in try : ", response);
    return response;
  }
);
const initialState = {
  services: [],
  subservices: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: {
    [getService.pending]: (state) => {
      state.services = [];
    },
    [getService.rejected]: (state) => {
      state.services = [];
    },
    [getService.fulfilled]: (state, action) => {
      state.services = action.payload;
    },
    [getSubservice.pending]: (state) => {
      state.subservices = [];
    },
    [getSubservice.rejected]: (state) => {
      state.subservices = [];
    },
    [getSubservice.fulfilled]: (state, action) => {
      state.subservices = action.payload;
    },
  },
});

const { reducer, actions } = contentSlice;

export default reducer;
