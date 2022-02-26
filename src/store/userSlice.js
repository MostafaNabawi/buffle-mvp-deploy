import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    space: false,
  },
  reducers: {
    setSpace: (state, action) => {
      state.space = action.payload;
    },
  },
});

export const { setSpace } = userSlice.actions;

export default userSlice.reducer;
