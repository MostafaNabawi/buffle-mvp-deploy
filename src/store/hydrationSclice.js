import { createSlice } from "@reduxjs/toolkit";

export const hydrationSlice = createSlice({
  name: "hydration",
  initialState: {
    data: {},
    precent: 100,
    reminder: 0,
    isMute: false,
    notificDelay: "",
    reminderDelay: "",
    usedPerPercent: 0,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setMute: (state) => {
      state.isMute = !state.isMute;
    },
    setPrecent: (state) => {
      if (state.precent > 0) {
        state.precent -= 1;
      }
    },
    setPrecentByAmount: (state, action) => {
      state.precent = action.payload;
    },
    setReminder: (state, action) => {
      if (state.precent > 0) {
        state.reminder += action.payload;
      }
    },
    setRemindertByAmount: (state, action) => {
      state.reminder = action.payload;
    },
    setNotificatiionDelay: (state, action) => {
      state.notificDelay = action.payload;
    },
    setReminderDelay: (state, action) => {
      state.reminderDelay = action.payload;
    },
    setUsedPerPercent: (state, action) => {
      state.usedPerPercent = 0;
      state.usedPerPercent = action.payload;
    },
  },
});

export const {
  setData,
  setMute,
  setPrecent,
  setPrecentByAmount,
  setReminder,
  setRemindertByAmount,
  setNotificatiionDelay,
  setReminderDelay,
  setUsedPerPercent,
} = hydrationSlice.actions;

export default hydrationSlice.reducer;
