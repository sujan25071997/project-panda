import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../src/styles/globals.css";
import Navbar from "@/components/NavBar";
import SignInPopUp from "@/components/SignInPopUp";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <SignInPopUp />
        </div>
      </SessionProvider>
    </Provider>
  );
}
