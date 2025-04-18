import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../src/styles/globals.css";
import Navbar from "@/components/NavBar";
import SignInPopUp from "@/components/SignInPopUp";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // Determine background image based on the route
  const getBackgroundImage = () => {
    switch (router.pathname) {
      case "/home":
        return "url('/blush_panda.png')";
      case "/profile":
        return "url('/panda-bg.png')";
      default:
        return "url('/blush_panda.png')";
    }
  };
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <div
          className="flex flex-col min-h-screen relative"
          style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Optional: Overlay to darken the background */}
          <div className="absolute inset-0 bg-black/10 z-0" />

          {/* Navbar stays on top */}
          <Navbar />

          {/* Main content goes here */}
          <main className="relative z-10 flex-1">
            <Component {...pageProps} />
          </main>

          {/* Pop-up or other elements */}
          <SignInPopUp />
          <ToastContainer />
        </div>
      </SessionProvider>
    </Provider>
  );
}
