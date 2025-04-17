"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import GoogleButton from "./core-components/GoogleButton";

export default function SignInPopUp() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if pop-up was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem("signInPopUpDismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
      return;
    }
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Don't show if authenticated or dismissed
  if (session || isDismissed || status === "loading") {
    return null;
  }

  const handleDismiss = () => {
    setIsOpen(false);
    setIsDismissed(true);
    localStorage.setItem("signInPopUpDismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <Image
            src="/hey_panda.png"
            alt="The Panda World"
            width={80}
            height={80}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Unlock the Full Experience!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Sign in with Google to access personalized features, save your
            progress, and join our community.
          </p>
          <GoogleButton />
          <button
            onClick={handleDismiss}
            className="text-green-600 hover:text-green-800 text-sm font-medium mt-5"
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
