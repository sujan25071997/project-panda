import { signOut } from "next-auth/react";
import { googleLoginSuccess, googleLoginFailure } from "../googleLoginSlice";
import { AppDispatch } from "../store";
import { setUserProfile } from "../userProfileSlice";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

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

      toast.success("Successfully logged in!", { autoClose: 1500 });
    } catch (error: any) {
      localStorage.clear();
      dispatch(googleLoginFailure("Google login failed"));
      toast.error("Google login failed!", { autoClose: 2000 });
      signOut({ callbackUrl: "/home" });
    }
  };
