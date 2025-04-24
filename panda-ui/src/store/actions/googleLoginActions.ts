import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { setUserProfile } from "../slices/userProfileSlice";
import axiosInstance from "@/utils/axiosInstance";

// Define types for the API response
interface GoogleLoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    google_id: string;
    created_at: string;
    updated_at: string;
    last_login: string;
    full_name: string;
  };
}

// Define the thunk for Google login
export const googleLogin = createAsyncThunk<
  GoogleLoginResponse,
  { accessToken: string; refreshToken: string },
  { rejectValue: string }
>(
  "googleLogin/login",
  async ({ accessToken, refreshToken }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/google-login/", {
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        user,
      } = response.data;

      if (!newAccessToken || !newRefreshToken || !user) {
        throw new Error("Invalid response from server");
      }

      // Store tokens securely (consider alternatives to localStorage)
      localStorage.setItem("access_token", newAccessToken);
      localStorage.setItem("refresh_token", newRefreshToken);

      // Update user profile in Redux
      dispatch(setUserProfile(user));

      toast.success("Successfully logged in!", { autoClose: 1500 });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error.message ||
        "Google login failed";
      localStorage.clear();
      toast.error(message, { autoClose: 1500 });
      signOut({ callbackUrl: "/home" });
      return rejectWithValue(message);
    }
  }
);
