import { createSlice } from "@reduxjs/toolkit";

export const screenReminderSclice = createSlice({
  name: "screen",
  initialState: {
    du_time: "10:00:00",
    dis_time: "00:50:00",
    updating:true
  },
  reducers: {
    setDu_time: (state, action) => {
      state.du_time = action.payload;
    },
    setDis_time: (state, action) => {
      state.dis_time = action.payload;
    },
    setUpdating: (state, action) => {
      state.updating = action.payload;
    },
  },
});

export const {setDu_time, setDis_time,setUpdating } =
  screenReminderSclice.actions;

export default screenReminderSclice.reducer;
