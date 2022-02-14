import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from "react-toast-notifications";
import store from "./store/store";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import German from "./lang/de.json";
import English from "./lang/en.json";
// import { getWaterHydration } from "./store/hydrationSclice";
// store.dispatch(getWaterHydration());
const locale = navigator.language;
console.log("Locale ", locale);
let lang;
if (locale.includes("en")) {
  lang = English;
} else if (locale.includes("de")) {
  lang = German;
} else {
  lang = English;
}
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={lang}>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);
