import { createSlice } from "@reduxjs/toolkit";

export const screenReminderSclice = createSlice({
  name: "screen",
  initialState: {
    du_time: "00:00:10",
    defaultTime: "00:00:10",
    dis_time: "00:00:05",
    default_dis_time:"00:00:05"
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
    setDefault_dis_time: (state, action) => {
      state.default_dis_time = action.payload;
    },
  },
});

export const { setValue, setDu_time, setDefault, setDis_time,setDefault_dis_time } =
  screenReminderSclice.actions;

export default screenReminderSclice.reducer;
