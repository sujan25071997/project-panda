import { RunawayPanda } from "./core-components/RunawayPanda";

export const HomePage = () => {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url("/blush_panda.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <RunawayPanda />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-screen text-white text-4xl font-bold">
        Welcome to Panda World 🐼
      </div>
    </div>
  );
};
