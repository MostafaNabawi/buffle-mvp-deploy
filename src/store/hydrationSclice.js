import { createSlice } from "@reduxjs/toolkit";

export const hydrationSlice = createSlice({
  name: "hydration",
  initialState: {
    data: {},
    precent: 100,
    reminder: 0,
    isMute: false,
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
    setReminder: (state, action) => {
      state.reminder += action.payload;
    },
  },
});

export const { setData, setMute, setPrecent, setReminder } =
  hydrationSlice.actions;

export default hydrationSlice.reducer;
