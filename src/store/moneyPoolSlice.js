import { createSlice } from "@reduxjs/toolkit";

export const moneyPoolSlice = createSlice({
  name: "moneyPool",
  initialState: {
    eventUsers: "",
    SelectedUserID: "",
  },
  reducers: {
    setEventUsers: (state, action) => {
      state.eventUsers = action.payload;
    },
    setSelectedUserID: (state, action) => {
      state.SelectedUserID = action.payload;
    },
  },
});

export const { setEventUsers, setSelectedUserID } = moneyPoolSlice.actions;

export default moneyPoolSlice.reducer;
