import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import English from "../lang/en.json";
import German from "../lang/de.json";
export const Context = React.createContext();

const local = navigator.language;

let lang;
if (local.includes("en")) {
  lang = English;
} else if (local.includes("de")) {
  lang = German;
} else {
  lang = English;
}

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);

  function selectLanguage(newLang) {
    setLocale(newLang);
    if (newLang === "en") {
      setMessages(English);
    } else {
      setMessages(German);
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
