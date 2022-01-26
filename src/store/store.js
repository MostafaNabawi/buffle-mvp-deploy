import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";

export default configureStore({
  reducer: {
    hydration: hydrationSclice,
  },
});
