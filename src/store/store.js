import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import screenReminderSclice from "./screenReminderSclice";
import userSlice from "./userSlice";
import taskSlice from "./taskSlice";
import moneyPoolSlice from "./moneyPoolSlice";

export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    screen: screenReminderSclice,
    user: userSlice,
    task: taskSlice,
    moneyPool: moneyPoolSlice,
  },
});
