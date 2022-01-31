import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import screenReminderSclice from "./screenReminderSclice";
import userSlice from "./userSlice";
import taskSlice from "./taskSlice";

export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    screen: screenReminderSclice,
    user: userSlice,
    task: taskSlice,
  },
});
