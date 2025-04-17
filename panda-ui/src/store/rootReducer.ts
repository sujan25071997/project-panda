import { combineReducers } from "redux";
import googleLoginReducer from "./googleLoginSlice";
import userProfileReducer from "./userProfileSlice";

const rootReducer = combineReducers({
  googleLogin: googleLoginReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
