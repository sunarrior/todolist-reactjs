import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../pages/Register/register.slice";

export default configureStore({
  reducer: {
    register: registerReducer,
  },
});
