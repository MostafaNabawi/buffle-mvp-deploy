const country = require("country-state-picker");

export const getCountry =()=>{
    return country.getCountries()
}
export const getStateOfCountry =(code)=>{
   return country.getStates(code)
}