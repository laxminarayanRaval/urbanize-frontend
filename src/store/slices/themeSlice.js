import { createSlice } from "@reduxjs/toolkit";
const themeMode = localStorage.getItem("themeMode");
export const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: themeMode ? themeMode : "light" },
  reducers: {
    changeThemeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

const { reducer, actions } = themeSlice;

export const { changeThemeMode } = actions;

export default reducer;
