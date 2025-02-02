"use client";
import Game from "./components/game";

export default function SaraSwiper() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 bg-[url('/wood-texture.jpg')] bg-cover bg-center select-none">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-lg p-8 text-center border-4 border-gray-300">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">Sara Swiper</h1>
        <h2 className="text-2xl text-gray-700 mb-2">👉 Swipe Right if you like</h2>
        <h2 className="text-2xl text-gray-700 mb-4">👈 Swipe Left if you don't</h2>
        <h3 className="text-lg text-gray-600 mb-2 italic">
          Need to learn more before swiping?
        </h3>
        <h3 className="text-lg text-gray-600">
          Click the link on the card for source code & deployment!
        </h3>
      </div>

      <div className="mt-10 relative w-full max-w-2xl flex items-center justify-center">
        <Game />
      </div>
    </div>
  );
}
