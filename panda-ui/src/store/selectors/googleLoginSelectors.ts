import { RootState } from "../store";

interface GoogleLoginState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const selectGoogleLoginState = (state: RootState): GoogleLoginState =>
  state.googleLogin;

export const selectAccessToken = (state: RootState): string | null =>
  selectGoogleLoginState(state).accessToken;

export const selectRefreshToken = (state: RootState): string | null =>
  selectGoogleLoginState(state).refreshToken;

export const selectIsLoggedIn = (state: RootState): boolean =>
  selectGoogleLoginState(state).isLoggedIn;

export const selectGoogleLoginLoading = (state: RootState): boolean =>
  selectGoogleLoginState(state).loading;

export const selectGoogleLoginError = (state: RootState): string | null =>
  selectGoogleLoginState(state).error;
