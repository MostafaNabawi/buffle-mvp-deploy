import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";

export const getWaterHydration = createAsyncThunk(
  "hydration/getWaterHydration",
  async () => {
    const response = await fetch(`${API_URL}/water_hydration/get`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await response.json();
    console.log(data, "data");
    return data;
  }
);

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
      state.data = { ...action.payload };
    },
    setMute: (state) => {
      state.isMute = !state.isMute;
    },
    setPrecent: (state) => {
      if (state.precent >= 1) {
        state.precent -= 1;
      }
    },
    setReminder: (state) => {
      if (state.reminder <= state.data.daily_goal) {
        state.reminder += 1;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getWaterHydration.fulfilled, (state, { payload }) => {
      state.data = { payload };
    });
  },
});

export const { setData, setMute, setPrecent, setReminder } =
  hydrationSlice.actions;

export default hydrationSlice.reducer;
