import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "@/store/actions/googleLoginActions";
import { RootState } from "@/store/store";

const AutoLoginHandler = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.googleLogin.isLoggedIn
  );

  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem("alreadyLoggedIn");

    const accessToken =
      session?.user?.accessToken || localStorage.getItem("access_token");
    const refreshToken =
      session?.user?.refreshToken || localStorage.getItem("refresh_token");

    if (
      !isLoggedIn &&
      !alreadyLoggedIn &&
      session &&
      accessToken &&
      refreshToken
    ) {
      dispatch(googleLogin(accessToken, refreshToken));
      localStorage.setItem("alreadyLoggedIn", "true"); // prevent reruns
    }
  }, [session, isLoggedIn, dispatch]);

  return null;
};

export default AutoLoginHandler;
