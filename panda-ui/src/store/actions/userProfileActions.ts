import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";

// Define types for the API response and profile data
interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  google_id: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  full_name: string;
  phone?: string;
  gender?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

// Update user profile by ID
export const updateProfile = createAsyncThunk<
  UserProfile,
  { id: string; profileData: UpdateProfileData },
  { rejectValue: string }
>("userProfile/update", async ({ id, profileData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/user/${id}/`, profileData);
    toast.success("Profile updated successfully.", { autoClose: 1500 });
    return response.data.user;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Profile update failed";
    toast.error(message, { autoClose: 1500 });
    return rejectWithValue(message);
  }
});
