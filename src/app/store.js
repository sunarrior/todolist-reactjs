import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../pages/Register/register.slice";
import loginReducer from "../pages/Login/login.slice";
import taskReducer from "../pages/Homepage/task.slice";

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    task: taskReducer,
  },
});
