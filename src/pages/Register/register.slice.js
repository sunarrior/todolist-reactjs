import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    email: "",
    password: "",
    repeatPassword: "",
  },
  reducers: {
    emailChange: (state, action) => {
      state.email = action.payload;
    },
    passwordChange: (state, action) => {
      state.password = action.payload;
    },
    repeatPasswordChange: (state, action) => {
      state.repeatPassword = action.payload;
    },
  },
});

export const { emailChange, passwordChange, repeatPasswordChange } =
  registerSlice.actions;

export default registerSlice.reducer;

export const selectAccountInfo = (state) => {
  return {
    email: state.register.email,
    password: state.register.password,
    repeatPassword: state.register.repeatPassword,
  };
};
