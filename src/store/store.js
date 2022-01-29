import { configureStore } from "@reduxjs/toolkit";
import hydrationSclice from "./hydrationSclice";
import screenReminderSclice from "./screenReminderSclice";

export default configureStore({
  reducer: {
    hydration: hydrationSclice,
    screen: screenReminderSclice,
  },
});
