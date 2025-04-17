import { configureStore } from "@reduxjs/toolkit";
import googleLoginReducer from "./googleLoginSlice";
import userProfileReducer from "./userProfileSlice";

const store = configureStore({
  reducer: {
    googleLogin: googleLoginReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
