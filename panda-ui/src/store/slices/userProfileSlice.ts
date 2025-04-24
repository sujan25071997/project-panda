import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserProfileState {
  profile: UserProfile | null;
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    fetchUserProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    fetchUserProfileFailure: (state, action: PayloadAction<string>) => {
      state.profile = null;
      state.error = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
  },
});

export const {
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  setUserProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
