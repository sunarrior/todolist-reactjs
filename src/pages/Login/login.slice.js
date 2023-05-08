import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    emailChange: (state, action) => {
      state.email = action.payload;
    },
    passwordChange: (state, action) => {
      state.password = action.payload;
    },
    resetPasswordState: (state) => {
      state.password = "";
    },
    resetState: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const { emailChange, passwordChange, resetPasswordState, resetState } =
  loginSlice.actions;

export default loginSlice.reducer;

export const selectAccountInfo = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
  };
};
