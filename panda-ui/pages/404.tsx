import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-center px-4 relative">
      {/* Light overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />

      <div className="relative z-10 p-6 rounded-xl backdrop-blur-md border border-white/30 shadow-xl max-w-lg w-full">
        <Image
          src="/panda-sad-404.gif"
          alt="Sad Panda"
          width={220}
          height={220}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-white mb-4">
          404 - Panda Not Found 🐼
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Uh-oh! This bamboo trail doesn’t lead anywhere. 🥲
        </p>
        <Link href="/home">
          <button className="px-6 py-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition font-semibold">
            Back to Bamboo Forest
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
