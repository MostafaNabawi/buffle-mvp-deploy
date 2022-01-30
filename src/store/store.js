import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import screenReminderSclice from "./screenReminderSclice";
import userSlice from "./userSlice";
export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    screen: screenReminderSclice,
    user: userSlice,
  },
});
