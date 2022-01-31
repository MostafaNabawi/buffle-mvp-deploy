import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import screenReminderSclice from "./screenReminderSclice";
import taskSlice from "./taskSlice";
import moneyPoolSlice from "./moneyPoolSlice";

export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    screen: screenReminderSclice,
    task: taskSlice,
    moneyPool: moneyPoolSlice,
  },
});
