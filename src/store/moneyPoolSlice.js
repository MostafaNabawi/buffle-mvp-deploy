import { createSlice } from "@reduxjs/toolkit";

export const moneyPoolSlice = createSlice({
  name: "moneyPool",
  initialState: {
    eventUsers: "",
    selectedUserID: "",
    ownerID: "",
    currencyName: "",
    currencyCode: "",
  },
  reducers: {
    setEventUsers: (state, action) => {
      state.eventUsers = action.payload;
    },
    setSelectedUserID: (state, action) => {
      state.selectedUserID = action.payload;
    },
    setOwnerID: (state, action) => {
      state.ownerID = action.payload;
    },
    setCurrencyName: (state, action) => {
      state.currencyName = action.payload;
    },
    setCurrencyCode: (state, action) => {
      state.currencyCode = action.payload;
    },
  },
});

export const {
  setEventUsers,
  setSelectedUserID,
  setOwnerID,
  setCurrencyName,
  setCurrencyCode,
} = moneyPoolSlice.actions;

export default moneyPoolSlice.reducer;
