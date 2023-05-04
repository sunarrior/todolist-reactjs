import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    fullName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  },
  reducers: {
    fullNameChange: (state, action) => {
      state.fullName = action.payload;
    },
    usernameChange: (state, action) => {
      state.username = action.payload;
    },
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

export const {
  fullNameChange,
  usernameChange,
  emailChange,
  passwordChange,
  repeatPasswordChange,
} = registerSlice.actions;

export default registerSlice.reducer;
