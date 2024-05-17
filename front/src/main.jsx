import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/ReduxStore.js"
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// require('dotenv').config();
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { store } from "./redux/slice/index.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
  </React.StrictMode>
);
