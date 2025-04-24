import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import {
  fetchUserProfileFailure,
  fetchUserProfileSuccess,
} from "../slices/userProfileSlice";
import axiosInstance from "@/utils/axiosInstance";

export const getProfileByEmail =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.get(`/user/profile/`, {
        params: { email },
      });

      dispatch(fetchUserProfileSuccess(response.data.user)); // or response.data if no `.user` key
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch profile:", error);
      dispatch(fetchUserProfileFailure("Failed to fetch profile"));
    }
  };

export const updateProfile =
  (id: string, profileData: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.put(`/user/${id}/`, profileData);
      dispatch(fetchUserProfileSuccess(response.data.user));
      toast.success("Profile updated successfully.", { autoClose: 1500 });
      return response.data;
    } catch (error: any) {
      dispatch(fetchUserProfileFailure("Profile update failed"));
      toast.error("Error during updating profile:", { autoClose: 1500 });
    }
  };
