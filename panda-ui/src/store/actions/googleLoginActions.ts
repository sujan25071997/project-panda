import { signOut } from "next-auth/react";
import {
  googleLoginSuccess,
  googleLoginFailure,
} from "../slices/googleLoginSlice";
import type { AppDispatch } from "@/store/store";
import { setUserProfile } from "../slices/userProfileSlice";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export const googleLogin =
  (accessToken: string, refreshToken: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.post("google-login/", {
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        user,
      } = response.data;

      if (newAccessToken && newRefreshToken && user) {
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        // ✅ Update redux store
        dispatch(googleLoginSuccess(newAccessToken));
        dispatch(setUserProfile(user));

        toast.success("Successfully logged in!", { autoClose: 1500 });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      localStorage.clear();
      dispatch(googleLoginFailure("Google login failed"));
      toast.error("Google login failed!", { autoClose: 1500 });
      signOut({ callbackUrl: "/home" });
    }
  };
