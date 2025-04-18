export const AboutPage = () => {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url("/panda-bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};
