import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    run: false,
    alert: false,
  },
  reducers: {
    setRun: (state, action) => {
      state.run = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setRun, setAlert } = taskSlice.actions;

export default taskSlice.reducer;
