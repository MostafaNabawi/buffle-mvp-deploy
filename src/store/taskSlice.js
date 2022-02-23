import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    run: false,
    alert: false,
    passAaler: false,
  },
  reducers: {
    setRun: (state, action) => {
      state.run = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setPassAlert: (state, action) => {
      state.passAaler = action.payload;
    },
  },
});

export const { setRun, setAlert, setPassAlert } = taskSlice.actions;

export default taskSlice.reducer;
