import { AppDispatch } from "../store";
import {
  fetchUserProfileFailure,
  fetchUserProfileSuccess,
} from "../userProfileSlice";
import axiosInstance from "@/utils/axiosInstance";

export const updateProfile =
  (id: string, profileData: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.put(`/user/${id}/`, profileData);
      dispatch(fetchUserProfileSuccess(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(fetchUserProfileFailure("Profile update failed"));
      console.error("Error during updating profile:", error.message);
    }
  };
