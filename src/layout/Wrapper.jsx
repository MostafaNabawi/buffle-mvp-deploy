import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import English from "../lang/en.json";
import German from "../lang/de.json";
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
  return (
    <Context.Provider value={{ locale, selectLanguage, getCurrent }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
