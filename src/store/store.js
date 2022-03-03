import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import screenReminderSclice from "./screenReminderSclice";
import taskSlice from "./taskSlice";
import moneyPoolSlice from "./moneyPoolSlice";
import projectSlice from "./projectSlice";
import userSlice from "./userSlice";
import notifySlice from "./notifySlice";
export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    screen: screenReminderSclice,
    task: taskSlice,
    moneyPool: moneyPoolSlice,
    projectName: projectSlice,
    user: userSlice,
    notify: notifySlice,
  },
});
