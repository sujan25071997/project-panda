import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { googleLogin } from "@/store/actions/googleLoginActions";
import { selectIsLoggedIn } from "@/store/selectors/googleLoginSelectors";

// Extend NextAuth session type to include accessToken and refreshToken
declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      [key: string]: any;
    };
  }
}

const AutoLoginHandler = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem("alreadyLoggedIn");

    // Ensure tokens are from session, not localStorage (for security)
    const accessToken = session?.user?.accessToken;
    const refreshToken = session?.user?.refreshToken;

    if (
      status === "authenticated" &&
      !isLoggedIn &&
      !alreadyLoggedIn &&
      accessToken &&
      refreshToken
    ) {
      dispatch(googleLogin({ accessToken, refreshToken }));
      localStorage.setItem("alreadyLoggedIn", "true"); // Prevent reruns
    }
  }, [session, status, isLoggedIn, dispatch]);

  return null;
};

export default AutoLoginHandler;
