import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { Provider } from "react-redux";
import store from "./app/store";

import App from "./App";
import "./config/firebase.config";
import { UserProvider } from "./context/user.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
