import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../pages/Register/register.slice";
import loginReducer from "../pages/Login/login.slice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});
