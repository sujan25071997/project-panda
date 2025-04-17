import { googleLoginSuccess, googleLoginFailure } from "../googleLoginSlice";
import { AppDispatch } from "../store";
import { setUserProfile } from "../userProfileSlice";
import axiosInstance from "@/utils/axiosInstance";

export const googleLogin =
  (accessToken: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.post("/google-login/", {
        access_token: accessToken,
      });

      // Store the access token and refresh token in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);

      // Store the user profile data in Redux
      dispatch(setUserProfile(response.data.user));

      // Dispatch the success action with the access token
      dispatch(googleLoginSuccess(response.data.access_token));
    } catch (error: any) {
      dispatch(googleLoginFailure("Google login failed"));
      console.error("Error during Google login:", error.message);
    }
  };
