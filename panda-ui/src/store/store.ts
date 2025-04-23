import { configureStore } from "@reduxjs/toolkit";
import googleLoginReducer from "./slices/googleLoginSlice";
import userProfileReducer from "./slices/userProfileSlice";

const store = configureStore({
  reducer: {
    googleLogin: googleLoginReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
