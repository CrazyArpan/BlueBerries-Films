import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

export const metadata = {
  title: "Upcoming - BlueBerries Films",
};

export default function UpcomingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-32">
      <div className="flex flex-col md:flex-row items-start justify-center gap-12 w-full max-w-7xl">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Nothing Found
          </h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            It seems we can’t find what you’re looking for. Perhaps searching
            can help.
          </p>
          <div className="w-full max-w-xl mb-8">
            <form className="flex">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-6 py-4 rounded-l bg-zinc-900 text-white border-none focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-r text-xl font-bold transition"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          <Link href="/home" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded text-lg transition mb-4">Back to Home</Link>
        </div>
        {/* Card (Right) */}
        <div className="bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md">
          {/* Search */}
          <div>
            <form className="flex">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-4 py-3 rounded-l bg-black text-white border-none focus:outline-none text-base"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-r text-lg font-bold transition"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          <hr className="my-6 border-zinc-700" />
          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Categories</h2>
            <div className="space-y-2 text-lg">
              {[
                "Dramas",
                "Historical",
                "Movie",
                "Movie Trailers",
                "Trailers",
                "TV Comedies",
                "TV Rumors",
                "TV Series",
                "Uncategorized",
              ].map((cat) => (
                <button
                  key={cat}
                  className="w-full text-left text-gray-200 hover:text-red-500 transition-colors duration-200"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <hr className="my-6 border-zinc-700" />
          {/* Tags */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "comedy",
                "Comedies",
                "Drama",
                "Dramas",
                "Historical",
                "Horror",
                "Movie",
                "Movie Trailers",
                "Thriller",
                "Trailers",
                "Tv Rumors",
                "TV Series",
              ].map((tag) => (
                <button
                  key={tag}
                  className="w-24 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white text-sm font-semibold hover:bg-red-600 transition cursor-pointer"
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <hr className="my-6 border-zinc-700" />
          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-6">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white text-2xl hover:bg-red-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white text-2xl hover:bg-red-600 transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white text-2xl hover:bg-red-600 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
