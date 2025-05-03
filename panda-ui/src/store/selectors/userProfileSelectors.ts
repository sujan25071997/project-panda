import { RootState } from "../store";

// Define the shape of the userProfile state for reference
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

// Base selector for the userProfile state
const selectUserProfileState = (state: RootState): UserProfileState =>
  state.userProfile;

// Derived selectors
export const selectUserProfile = (state: RootState): UserProfile | null =>
  selectUserProfileState(state).profile;

export const selectUserProfileLoading = (state: RootState): boolean =>
  selectUserProfileState(state).loading;

export const selectUserProfileError = (state: RootState): string | null =>
  selectUserProfileState(state).error;

// Specific field selectors (optional, for convenience)
export const selectUserFullName = (state: RootState): string | null =>
  selectUserProfile(state)?.full_name ?? null;

export const selectUserEmail = (state: RootState): string | null =>
  selectUserProfile(state)?.email ?? null;
