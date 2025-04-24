import Link from "next/link";
import TransparentCard from "./core-components/TransparentCard";

const exploreItems = [
  {
    title: "Panda Wallpaper",
    description: "Decorate your screen with the cutest panda backgrounds!",
    href: "/explore/wallpaper",
    buttonText: "Explore Panda Wallpaper",
  },
  {
    title: "Panda Toys",
    description: "Adorable plushies and collectibles await you.",
    href: "/explore/toys",
    buttonText: "Explore Panda Toys",
  },
  {
    title: "Panda Items",
    description: "From mugs to t-shirts, discover panda-themed goodies.",
    href: "/explore/items",
    buttonText: "Explore Panda Items",
  },
];

export const ExplorePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br  via-5% to-emerald-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-4">
          🐼 Explore the Panda World
        </h1>
        <p className="text-center text-emerald-800 mb-10 max-w-2xl mx-auto">
          Discover a magical world full of panda wallpapers, toys, and themed
          items. Dive into the bamboo forest and find your favorites!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {exploreItems.map((item, index) => (
            <TransparentCard key={index} className="max-w-md mx-auto">
              <h2 className="text-white text-2xl font-bold mb-2">
                {item.title}
              </h2>
              <p className="text-white/80 mb-4">{item.description}</p>
              <Link href={item.href}>
                <button className="mt-2 px-4 py-2 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-100 transition">
                  {item.buttonText}
                </button>
              </Link>
            </TransparentCard>
          ))}
        </div>
      </div>
    </div>
  );
};
