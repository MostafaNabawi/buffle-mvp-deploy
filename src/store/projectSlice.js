import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projectName",
  initialState: {
    value: null,
    date: null,
  },
  reducers: {
    setProjectValue: (state, action) => {
      state.value = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setProjectValue, setDate } = projectSlice.actions;

export default projectSlice.reducer;
