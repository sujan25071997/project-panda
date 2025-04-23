import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../src/styles/globals.css";
import Navbar from "@/components/NavBar";
import SignInPopUp from "@/components/SignInPopUp";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import AutoLoginHandler from "@/components/core-components/AutoLoginHandler";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css"; // ensure toast styles are loaded

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // Set background image based on route
  const getBackgroundImage = (): string => {
    const routeBackgroundMap: Record<string, string> = {
      "/home": "url('/blush_panda.png')",
      "/profile": "url('/panda-bg.png')",
    };
    return routeBackgroundMap[router.pathname] || "url('/blush_panda.png')";
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <AutoLoginHandler />
          <div
            className="flex flex-col h-screen relative overflow-hidden"
            style={{
              backgroundImage: getBackgroundImage(),
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Optional background overlay */}
            <div className="absolute inset-0 bg-black/10 z-0" />

            {/* Navbar stays on top */}
            <Navbar />

            {/* Main content */}
            <main className="relative z-10 flex-1">
              <Component {...pageProps} />
            </main>

            {/* Toasts and popups */}
            <SignInPopUp />
            <ToastContainer />
          </div>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
