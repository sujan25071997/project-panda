import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GoogleLoginState {
  accessToken: string | null;
  error: string | null;
}

const initialState: GoogleLoginState = {
  accessToken: null,
  error: null,
};

const googleLoginSlice = createSlice({
  name: "googleLogin",
  initialState,
  reducers: {
    googleLoginSuccess: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.error = null;
    },
    googleLoginFailure: (state, action: PayloadAction<string>) => {
      state.accessToken = null;
      state.error = action.payload;
    },
  },
});

export const { googleLoginSuccess, googleLoginFailure } =
  googleLoginSlice.actions;
export default googleLoginSlice.reducer;
