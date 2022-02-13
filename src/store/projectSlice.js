import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projectName",
  initialState: {
    value: null,
  },
  reducers: {
    setProjectValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProjectValue } = projectSlice.actions;

export default projectSlice.reducer;
