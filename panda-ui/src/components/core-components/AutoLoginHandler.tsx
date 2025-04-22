import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { googleLogin } from "@/store/actions/googleLoginActions";

const AutoLoginHandler = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const hasLoggedIn = useRef(false); // prevent repeat logins

  useEffect(() => {
    if (hasLoggedIn.current) return;

    const accessToken =
      session?.user?.accessToken || localStorage.getItem("access_token");
    const refreshToken =
      session?.user?.refreshToken || localStorage.getItem("refresh_token");

    if (session && accessToken && refreshToken) {
      dispatch(googleLogin(accessToken, refreshToken));
      hasLoggedIn.current = true; // prevent future dispatches
    }
  }, [session, dispatch]);

  return null;
};

export default AutoLoginHandler;
