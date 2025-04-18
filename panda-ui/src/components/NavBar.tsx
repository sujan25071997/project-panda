"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { googleLogin } from "@/store/actions/googleLoginActions";
import { usePathname } from "next/navigation"; // Import for pathname

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname(); // Get the current pathname

  // Check if the current link is the active one
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-white ${
        isActive ? "bg-green-700" : "hover:bg-green-700"
      } px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
    >
      {children}
    </Link>
  );
};

const AuthButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="text-white bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
  >
    {children}
  </button>
);

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);
  const clearLocalStorage = () => localStorage.clear();

  useEffect(() => {
    if (session?.accessToken) {
      dispatch(googleLogin(session.accessToken));
    }
  }, [session, dispatch]);

  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Image
              src={"/favicon.ico"}
              alt="Logo"
              width={40}
              height={40}
              className="mr-5"
            />
            <Link href="/" className="text-2xl font-bold text-white">
              The Panda World
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {session ? (
              <>
                <NavLink href="/profile">Profile</NavLink>
                <AuthButton
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    clearLocalStorage();
                  }}
                >
                  Sign Out
                </AuthButton>
              </>
            ) : (
              <AuthButton onClick={() => signIn("google")}>Sign In</AuthButton>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
            <NavLink href="/home" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink href="/about" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink href="/contact" onClick={toggleMenu}>
              Contact
            </NavLink>
            {session ? (
              <>
                <NavLink href="/profile" onClick={toggleMenu}>
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/home" });
                    toggleMenu();
                    clearLocalStorage();
                  }}
                  className="text-white hover:bg-green-600 w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signIn("google");
                  toggleMenu();
                }}
                className="text-white hover:bg-green-600 w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
