import Link from "next/link";
import ImageSlideOnEdge from "./core-components/ImageSideOnEdge";
import PandaPopulationCard from "./core-components/PandaPopulationCard";
import { RunawayPanda } from "./core-components/RunawayPanda";
import TransparentCard from "./core-components/TransparentCard";

export const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <RunawayPanda />
      <ImageSlideOnEdge
        src="/welcome-panda.gif"
        direction="right"
        width={200}
        height={200}
        threshold={200}
      />
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
            Introducing our latest panda plushie: <em>Blushy the Panda</em> —
            soft, cuddly, and 100% adorable.
          </p>
          <Link href="/explore">
            <button className="mt-2 px-4 py-2 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-100 transition">
              Explore Panda World 🌏
            </button>
          </Link>
        </TransparentCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-10 relative z-10">
        <PandaPopulationCard />
      </div>
    </div>
  );
};
