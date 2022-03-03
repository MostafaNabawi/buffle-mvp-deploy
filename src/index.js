import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from "react-toast-notifications";
import store from "./store/store";
import { Provider } from "react-redux";
import Wrapper from "./layout/Wrapper";
import Sound from "./components/sound";
ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <ToastProvider>
        <BrowserRouter>
          <App />
          <Sound />
        </BrowserRouter>
      </ToastProvider>
    </Wrapper>
  </Provider>,
  document.getElementById("root")
);
