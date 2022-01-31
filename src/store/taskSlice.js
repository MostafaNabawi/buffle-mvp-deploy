import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    run: false,
  },
  reducers: {
    setRun: (state, action) => {
      state.run = action.payload;
    },
  },
});

export const { setRun } = taskSlice.actions;

export default taskSlice.reducer;
