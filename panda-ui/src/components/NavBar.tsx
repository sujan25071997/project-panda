import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import { LogIn, LogOut, UserCircle2, UserPen } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const clearLocalStorage = () => localStorage.clear();
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative z-[1000] bg-white/30 backdrop-brightness-40 shadow-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Image
              src="/favicon.ico"
              alt=""
              width={40}
              height={40}
              className="mr-5"
            />
            <Link href="/home" className="text-2xl font-bold text-white">
              The Panda World
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {[
              { label: "Home", href: "/home" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                  isActive(href) ? "bg-green-800" : "hover:bg-green-700"
                }`}
              >
                {label}
              </Link>
            ))}

            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full border border-white"
                    />
                  ) : (
                    <UserCircle2 className="text-white w-8 h-8" />
                  )}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-40 bg-white/60 backdrop-brightness-40 rounded-md shadow-md overflow-hidden z-50 transition-all duration-200 origin-top-right ${
                    dropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    href="/profile"
                    className="flex justify-between px-4 py-2 text-sm text-gray-800 hover:bg-green-600 transition rounded-t-md"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div>Profile</div>
                    <UserPen size={15} />
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      clearLocalStorage();
                    }}
                    className="flex justify-between cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-green-600 transition rounded-b-md"
                  >
                    <div>Sign Out</div>
                    <LogOut size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="w-24 flex justify-between items-center text-white bg-green-700 hover:bg-green-800 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                <div>Sign In</div>
                <LogIn size={15} />
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
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
            {[
              { label: "Home", href: "/home" },
              { label: "About", href: "/about" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}

            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    clearLocalStorage();
                    toggleMenu();
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
