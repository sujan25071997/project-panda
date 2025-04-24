"use client";

import Image from "next/image";

export const AboutPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 text-white">
      {/* Semi-transparent overlay to improve readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />

      {/* Page content */}
      <div className="relative z-10 max-w-3xl text-center bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
        <Image
          src="/panda-bubu.gif"
          alt="Animated Panda"
          width={100}
          height={100}
          className="fixed bottom-99 drop-shadow-xl"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-lime-300 to-green-400 text-transparent bg-clip-text drop-shadow-md">
          Welcome to The Panda World 🐼
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-gray-100 mb-6">
          Discover a space where pandas thrive, vibes are chill, and tech meets
          cuteness. From quirky animations to panda-themed products, our
          universe is designed to keep you entertained.
        </p>

        <p className="text-md text-gray-300 mb-8">
          Built with ❤️ using Next.js, React, Tailwind, and pure panda power.
        </p>

        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-300">
          Browse Panda Goodies
        </button>
      </div>
    </div>
  );
};
