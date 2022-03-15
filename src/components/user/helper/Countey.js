const country = require("country-state-picker");
const countries = require("i18n-iso-countries");

countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export const getCountry = (lang) => {
  if (lang === 0) {
    return countries.getNames("en", { select: "official" });
  } else {
    return countries.getNames("de", { select: "official" });
  }
};
export const getStateOfCountry = (code) => {
  return country.getStates(code.toLowerCase());
};
