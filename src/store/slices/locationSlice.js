import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: { city: null },
  reducers: {
    setLocation: (state, action) => {
      state.city = action.payload;
    },
  },
});

const { reducer, actions } = locationSlice;

export const { setLocation } = actions;

export default reducer;
