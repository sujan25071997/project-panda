import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { googleLogin } from "../actions/googleLoginActions";

interface GoogleLoginState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: GoogleLoginState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  isLoggedIn: false,
  error: null,
};

const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload || "Google login failed";
      });
  },
});

export const { clearError } = googleLoginSlice.actions;
export default googleLoginSlice.reducer;
