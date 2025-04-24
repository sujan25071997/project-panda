import { combineReducers } from "redux";
import googleLoginReducer from "./slices/googleLoginSlice";
import userProfileReducer from "./slices/userProfileSlice";

const rootReducer = combineReducers({
  googleLogin: googleLoginReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
