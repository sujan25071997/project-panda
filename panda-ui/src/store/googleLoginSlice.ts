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
    },
    googleLoginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { googleLoginSuccess, googleLoginFailure } =
  googleLoginSlice.actions;
export default googleLoginSlice.reducer;
