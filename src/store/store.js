import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import taskSlice from "./taskSlice";

export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    task: taskSlice,
  },
});
