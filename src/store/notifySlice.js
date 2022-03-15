import { createSlice } from "@reduxjs/toolkit";

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    play: false,
    type: 0,
  },
  reducers: {
    setToggle: (state, action) => {
      state.type = action.payload.type;
      state.play = action.payload.play;
    },
  },
});

export const { setToggle } = notifySlice.actions;

export default notifySlice.reducer;
