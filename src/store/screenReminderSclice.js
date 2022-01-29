import { createSlice } from "@reduxjs/toolkit";

export const screenReminderSclice = createSlice({
  name: "screen",
  initialState: {
    du_time: "00:10:00",
    defaultTime: "00:10:00",
    dis_time: "00:00:10",
  },
  reducers: {
    setDu_time: (state, action) => {
      state.du_time = action.payload;
    },
    setDefault: (state, action) => {
      state.defaultTime = action.payload;
    },
    setDis_time: (state, action) => {
      state.dis_time = action.payload;
    },
  },
});

export const { setValue, setDu_time, setDefault, setDis_time } =
  screenReminderSclice.actions;

export default screenReminderSclice.reducer;
