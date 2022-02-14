/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const hydrationSlice = createSlice({
  name: "hydration",
  initialState: {
    data: {},
    precent: 100,
    reminder: 0,
    isMute: false,
    notificDelay: "",
    notificTimer: "",
    reminderDelay: "",
    usedPerPercent: 0,
    inChanged: false,
    timeOutId: "",
    render: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setMute: (state) => {
      state.isMute = !state.isMute;
    },
    setPrecent: (state) => {
      if (state.precent < 100) {
        state.precent += 1;
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
    setNotificatiionTimer: (state, action) => {
      state.notificTimer = action.payload;
    },
    setReminderDelay: (state, action) => {
      state.reminderDelay = action.payload;
    },
    setUsedPerPercent: (state, action) => {
      state.usedPerPercent = 0;
      state.usedPerPercent = action.payload;
    },
    setIsChanged: (state, action) => {
      state.inChanged = action.payload;
    },
    setTimeOutID: (state, action) => {
      state.timeOutId = action.payload;
    },
    setRender: (state, action) => {
      state.render = action.payload;
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
  setNotificatiionTimer,
  setReminderDelay,
  setUsedPerPercent,
  setIsChanged,
  setTimeOutID,
} = hydrationSlice.actions;

export default hydrationSlice.reducer;
