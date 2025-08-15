import Image from "next/image";
import Link from "next/link";

const bgImages = [
  "https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg", // Everest
  "https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg", // John Wick
  "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", // Pirates
  "https://image.tmdb.org/t/p/original/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg", // Better Call Saul
  "https://image.tmdb.org/t/p/original/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", // Interstellar
  "https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg", // Black Panther
  "https://image.tmdb.org/t/p/original/2CAL2433ZeIihfX1Hb2139CX0pW.jpg", // Cinderella
  "https://image.tmdb.org/t/p/original/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", // Money Heist
  "https://image.tmdb.org/t/p/original/6TjllWT3cGrPFyqDXurVZ3L8bBi.jpg", // Frozen
  "https://image.tmdb.org/t/p/original/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg", // Goal
  "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", // Wonder Woman
  "https://image.tmdb.org/t/p/original/6KErczPBROQty7QoIsaa6wJYXZi.jpg", // Minions
];

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        {/* Background grid */}
        <div className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-3 gap-2 opacity-60">
          {bgImages.map((src, i) => (
            <div key={i} className="relative w-full h-full min-h-[200px]">
              <Image
                src={src}
                alt={`bg${i}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />
        {/* Login form */}
        <div className="relative z-20 w-full max-w-md mx-auto bg-black/80 rounded-lg shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-8 tracking-wide">
            BlueBerries
            <span className="text-white text-base align-super ml-1">FILMS</span>
          </h1>
          {/* Mobile OTP Login Form */}
          <LoginMobileOTPForm />
        </div>
        {/* Floating action button (bottom right) */}
        <button className="fixed bottom-8 right-8 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

import LoginMobileOTPForm from "./LoginMobileOTPForm";
