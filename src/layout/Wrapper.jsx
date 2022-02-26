import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import English from "../lang/en.json";
import German from "../lang/de.json";
import { API_URL } from "../config";
export const Context = React.createContext();

const local = navigator.language;

let lang;
let type;
if (local.includes("en")) {
  lang = English;
  type = 0;
} else if (local.includes("de")) {
  lang = German;
  type = 1;
} else {
  lang = English;
  type = 0;
}

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  const [current, setCurrent] = useState(type);
  function selectLanguage(newLang) {
    setLocale(newLang);
    if (newLang === "en") {
      setMessages(English);
      setCurrent(0);
    } else {
      setMessages(German);
      setCurrent(1);
    }
  }
  function getCurrent() {
    return current;
  }
  const customHandler = () => {
    const url = window.location.href;
    if (url?.includes("localhost")) {
      console.error("Missing translition words.");
    }
  };
  useEffect(() => {
    let prefrence = localStorage.getItem("prefrence");
    if (prefrence) {
      prefrence = JSON.parse(prefrence);
      selectLanguage(prefrence?.language);
    }
  }, []);
  return (
    <Context.Provider value={{ locale, selectLanguage, getCurrent }}>
      <IntlProvider messages={messages} locale={locale} onError={customHandler}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
