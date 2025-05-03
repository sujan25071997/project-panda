import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateProfile } from "../actions/userProfileActions";

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

interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed";
      });
  },
});

export const { clearError, setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
