import { RunawayPanda } from "./core-components/RunawayPanda";
import TransparentCard from "./core-components/TransparentCard";

export const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <RunawayPanda />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 relative z-10">
        <TransparentCard className="max-w-md">
          <h2 className="text-white text-2xl font-bold mb-2">
            🐼 Did You Know?
          </h2>
          <p className="text-white/80">
            A panda’s diet is 99% bamboo 🌿, but they still have the digestive
            system of a carnivore! That’s why they eat so much—up to 38kg a day!
          </p>
        </TransparentCard>

        <TransparentCard className="max-w-md">
          <h2 className="text-white text-2xl font-bold mb-2">
            🛍️ Featured Panda Product
          </h2>
          <p className="text-white/80 mb-4">
            Introducing our latest panda plushie: *Blushy the Panda* — soft,
            cuddly, and 100% adorable.
          </p>
          <button className="mt-2 px-4 py-2 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-100 transition">
            Shop Now
          </button>
        </TransparentCard>
      </div>
    </div>
  );
};
