import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedback: {
    message: null,
    type: null,
  },
  config: {
    theme: "light",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reportFeedback: (state, action) => {
      state.feedback.message = action.payload.message;
      state.feedback.type = action.payload.type;
    },
    clearFeedback: (state) => {
      state.feedback.message = null;
      state.feedback.type = null;
    },
    updateTheme: (state) => {
      state.config.theme = state.config.theme === "light" ? "dark" : "light";
    },
  },
});

export const { reportFeedback, updateTheme, clearFeedback } = appSlice.actions;
export const selectFeedback = (state) => state.app.feedback;
export const selectTheme = (state) => state.app.config.theme;

export default appSlice.reducer;
