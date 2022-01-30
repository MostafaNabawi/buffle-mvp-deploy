import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    switched: false,
    type: "",
  },
  reducers: {
    setSwitched: (state, action) => {
      state.switched = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setSwitched, setType } = userSlice.actions;

export default userSlice.reducer;
