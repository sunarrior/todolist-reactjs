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
  },
});

export const { emailChange, passwordChange } = loginSlice.actions;

export default loginSlice.reducer;

export const selectAccountInfo = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
  };
};
