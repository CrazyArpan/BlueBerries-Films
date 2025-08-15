"use client";
import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Player from "@/app/components/Player";

// This should be kept in sync with featuredMovies in home/page.tsx
const featuredMovies = [
  {
    slug: 'tomar-amar-google-meet',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Tomar-Amar-Google-Meet-Bengali-Movie-Blue-Berries.jpg',
    title: 'Tomar Amar Google Meet',
    genre: 'Romance',
    duration: '30-40 minutes',
    description: 'Two co-workers battle it out over Google Meet—only to find love hidden in emojis, memes, and missed deadlines.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'jhalmuri-junction',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Jhalmuri-Junction-Bengali-Movie-Blueberries.jpg',
    title: 'Jhalmuri Junction',
    genre: 'Romance',
    duration: '35-45 minutes',
    description: 'Two strangers miss their trains, share jhalmuri on a foggy platform, and discover that sometimes a missed train takes you to the right destination.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'facebook-e-first-love',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Facebook-first-Love-Bengali-Movie-Blue-Berries-OTT.jpg',
    title: 'Facebook-e First Love',
    genre: 'Romance',
    duration: '30-40 minutes',
    description: 'Aniket accidentally sends a Facebook message to Mallika — only to discover they were classmates in the same school but never once crossed paths.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'chuti-bela',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Chuti-Bela-Blueberries-Bengali-Movie.jpg',
    title: 'Chuti Bela',
    genre: 'Romance',
    duration: '30-40 minutes',
    description: 'Old rivals, a school play, and a village soaked in nostalgia — where childhood banter turns into grown-up blushes.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'rong-pencil',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Rang-Pencil-Bengali-movie-Blueberries-Movie-streaming-platform.jpg',
    title: 'Rong Pencil',
    genre: 'Romance',
    duration: '30-35 minutes',
    description: 'When a cartoonist loses his words, he finds them again in the colors of silence. A story where love is drawn, not spoken.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'ektu-prem-ektu-chatpata',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Ektu-Prem-Ektu-Chatpata-Bangla-Film-2025.jpg',
    title: 'Ektu Prem, Ektu Chatpata',
    genre: 'Romance',
    duration: '35 minutes',
    description: 'Love, like chotpoti, is best when it burns just a little. One street vendor\'s charm meets a no-nonsense law student—and sparks fly with every bite.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'crush-e-click',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/Crush-E-Click-Bengali-Film-2025.jpg',
    title: 'Crush-e Click',
    genre: 'Romance',
    duration: '30-45 minutes',
    description: 'A quirky girl. A delivery boy. Countless online orders… and one accidental love story that clicks right where it matters— the heart.',
    tags: ['45 Mins Movie', 'Romance']
  },
  {
    slug: 'the-red-files',
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/The-Red-Files-2024.jpeg',
    title: 'The Red Files',
    genre: 'Crime',
    duration: '2h : 15m',
    description: 'Based on the true event of the Bantala Rape Case in the 1990s, West Bengal. IMDb: 8.5/10',
    tags: ['Crime', 'Thriller']
  },
];

// Copy of the films array from home/page.tsx
const films = [
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Tomar-Amar-Google-Meet-Bengali-Movie.jpg",
    title: "Tomar Amar Google Meet",
    genre: "Romance",
    duration: "30-40 minutes",
    description: "Two co-workers battle it out over Google Meet—only to find love hidden in emojis, memes, and missed deadlines.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Jhalmuri-Junction-Bengali-Movie.jpg",
    title: "Jhalmuri Junction",
    genre: "Romance",
    duration: "35-45 minutes",
    description: "Two strangers miss their trains, share jhalmuri on a foggy platform, and discover that sometimes a missed train takes you to the right destination.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Facebook-first-Love-Bengali-Movie.jpg",
    title: "Facebook-e First Love",
    genre: "Romance",
    duration: "30-40 minutes",
    description: "Aniket accidentally sends a Facebook message to Mallika — only to discover they were classmates in the same school but never once crossed paths.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Chuti-Bela-Bengali-movie.jpg",
    title: "Chuti Bela",
    genre: "Romance",
    duration: "30-40 minutes",
    description: "Old rivals, a school play, and a village soaked in nostalgia — where childhood banter turns into grown-up blushes.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Rang-Pencil-Bengali-movie-Blueberries.jpg",
    title: "Rong Pencil",
    genre: "Romance",
    duration: "30-35 minutes",
    description: "When a cartoonist loses his words, he finds them again in the colors of silence. A story where love is drawn, not spoken.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Ektu-Prem-Ektu-Chatpata-Bangla-Natok-1.jpg",
    title: "Ektu Prem, Ektu Chatpata",
    genre: "Romance",
    duration: "35 minutes",
    description: "Love, like chotpoti, is best when it burns just a little. One street vendor's charm meets a no-nonsense law student—and sparks fly with every bite.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Bengali-Film-2025-Upcoming-1.jpg",
    title: "Crush-e Click",
    genre: "Romance",
    duration: "30-45 minutes",
    description: "A quirky girl. A delivery boy. Countless online orders… and one accidental love story that clicks right where it matters— the heart.",
    tags: ["45 Mins Movie", "Romance"]
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/lY1rOjipVwHWdkABzOXTUDKCWmn.jpg.jpg",
    title: "Subscription Movie",
    genre: "Premium",
    duration: "40 minutes",
    description: "A special subscription-only movie.",
    tags: ["Premium", "Subscription"]
  },
];

// Add musicVideos array from home page
const musicVideos = [
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Bandhu-Dekha-Hobe-The-Red-file-2024-Music-video-Song.jpg",
    title: "Bondhu Dekha Hobe",
    genre: "Music Video",
  },
  {
    src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Tui-Je-Amar-Noy-The-Red-Files-2024-Music-Video-1.jpg",
    title: "Tui Je Amar Noy",
    genre: "Music Video",
  },
];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function MoviePageClient({ slug }: { slug: string }) {
  const [showFull, setShowFull] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerMovie, setPlayerMovie] = useState(featuredMovies.find(m => m.slug === slug));
  
  useEffect(() => {
    const onScroll = () => {
      setShowGoTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!playerMovie) return notFound();

  return (
    <>
      <div className="min-h-screen w-full bg-black pt-24">
        {/* Hero Section */}
        <div className="relative w-full min-h-[60vh] flex items-end">
          <img
            src={playerMovie.src}
            alt={playerMovie.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="relative z-10 p-12 max-w-3xl">
            <span className="text-white/80 font-semibold text-lg mb-2 block">{playerMovie.genre}</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">{playerMovie.title}</h1>
            <div className="text-white/90 text-lg mb-4">
              Genre: {playerMovie.tags?.join(', ')} | Language: Bengali | Duration: {playerMovie.duration} Status: Upcoming | Studio: Blueberries Originals
            </div>
            <div className={`text-white/90 text-base max-w-2xl leading-relaxed mb-4 ${showFull ? '' : 'line-clamp-2'}`}
              style={!showFull ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' } : {}}>
              {playerMovie.description}
            </div>
            {!showFull && (
              <button
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded shadow mb-4 transition"
                onClick={() => setShowPlayer(true)}
              >
                Read More
              </button>
            )}
            {showFull && (
              <div className="text-white/80 text-base mb-4">
                <div>Genre: {playerMovie.genre}</div>
                <div>Duration: {playerMovie.duration}</div>
                <div>Status: Upcoming</div>
                <div>Studio: Blueberries Originals</div>
              </div>
            )}
            <div className="flex gap-4 mt-4 items-center">
              {/* Start Watching */}
              <button
                type="button"
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 w-fit transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                onClick={() => { setPlayerMovie(playerMovie); setShowPlayer(true); }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
                  <polygon points="12,10 20,14 12,18" fill="white" />
                </svg>
                <span className="font-bold text-lg md:text-xl">Start Watching</span>
              </button>
              {/* Watch List */}
              <button type="button" className="flex items-center gap-3 bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 w-fit text-lg md:text-xl cursor-pointer">
                <span className="text-2xl font-bold">+</span>
                <span className="font-bold">Watch List</span>
              </button>
              {/* Heart (Like) */}
              <button type="button" aria-label="Like" className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 26.5C16 26.5 6 19.5 6 13.5C6 10.5 8.5 8 11.5 8C13.2 8 14.7 9 15.5 10.2C16.3 9 17.8 8 19.5 8C22.5 8 25 10.5 25 13.5C25 19.5 16 26.5 16 26.5Z" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </button>
              {/* Share */}
              <button type="button" aria-label="Share" className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="16" r="2" fill="white" />
                  <circle cx="24" cy="8" r="2" fill="white" />
                  <circle cx="24" cy="24" r="2" fill="white" />
                  <line x1="9.5" y1="15.5" x2="22" y2="9.5" stroke="white" strokeWidth="2" />
                  <line x1="9.5" y1="16.5" x2="22" y2="22.5" stroke="white" strokeWidth="2" />
                </svg>
              </button>
              {/* Playlist */}
              <button type="button" aria-label="Playlist" className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="10" width="12" height="2" rx="1" fill="white" />
                  <rect x="8" y="15" width="12" height="2" rx="1" fill="white" />
                  <rect x="8" y="20" width="7" height="2" rx="1" fill="white" />
                  <polygon points="22,20 26,22 22,24" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Recommended Section */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Recommended</h2>
          <div className="flex gap-4 flex-wrap justify-start items-start pb-4">
            {films
              .filter(f => f.title !== "The Red Files" && toSlug(f.title) !== slug && f.title !== "Subscription Movie")
              .map((film) => (
                <div
                  key={film.title}
                  className="group min-w-[170px] max-w-[170px] h-[250px] bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105 z-10 ring-0 group-hover:ring-2 group-hover:ring-red-500 group-hover:ring-opacity-80 group-hover:shadow-red-500/50"
                  tabIndex={0}
                >
                  <img
                    src={film.src}
                    alt={film.title}
                    className="w-full h-full object-cover rounded-2xl"
                    draggable={false}
                  />
                  {/* Overlay on hover only */}
                  <div className="absolute left-0 bottom-0 w-full bg-zinc-900/95 rounded-b-2xl p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-gray-300 text-xs mb-0.5">
                      <span role="img" aria-label="language">🌐</span> Bengali
                    </div>
                    <span className="text-white font-bold text-xs mb-0.5">{film.genre}</span>
                    <h3 className="text-sm font-bold text-white mb-1">{film.title}</h3>
                    <div className="flex items-end w-full gap-2 mt-auto">
                      <button
                        type="button"
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-lg font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        tabIndex={0}
                        aria-label="Add to Watch List"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 rounded-lg transition shadow-lg text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                        tabIndex={0}
                        role="button"
                        onClick={() => { setPlayerMovie(film); setShowPlayer(true); }}
                      >
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Subscription Movies Section */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L4.8 10.5L8 14L12 7L16 14L19.2 10.5L20 16" fill="#FFD600"/>
              <rect x="6" y="17" width="12" height="3" rx="1.5" fill="#FFD600"/>
            </svg>
            Subscription Movies
          </h2>
          <div className="flex gap-4 flex-wrap justify-start items-start pb-4">
            {films
              .filter(f => f.title === "Subscription Movie")
              .map((film) => (
                <div
                  key={film.title}
                  className="group min-w-[170px] max-w-[170px] h-[250px] bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105 z-10 ring-0 group-hover:ring-2 group-hover:ring-yellow-400 group-hover:ring-opacity-80 group-hover:shadow-yellow-400/50"
                  tabIndex={0}
                >
                  {/* Crown badge for subscription movie */}
                  <div className="absolute top-2 right-2 z-20 bg-[#FFD600] rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16L4.8 10.5L8 14L12 7L16 14L19.2 10.5L20 16" fill="#fff"/>
                      <rect x="6" y="17" width="12" height="3" rx="1.5" fill="#fff"/>
                    </svg>
                  </div>
                  <img
                    src={film.src}
                    alt={film.title}
                    className="w-full h-full object-cover rounded-2xl"
                    draggable={false}
                  />
                  {/* Overlay on hover only */}
                  <div className="absolute left-0 bottom-0 w-full bg-zinc-900/95 rounded-b-2xl p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-gray-300 text-xs mb-0.5">
                      <span role="img" aria-label="language">🌐</span> Bengali
                    </div>
                    <span className="text-white font-bold text-xs mb-0.5">{film.genre}</span>
                    <h3 className="text-sm font-bold text-white mb-1">{film.title}</h3>
                    <div className="flex items-end w-full gap-2 mt-auto">
                      <button
                        type="button"
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-lg font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        tabIndex={0}
                        aria-label="Add to Watch List"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-zinc-900 text-xs font-bold py-1 rounded-lg transition shadow-lg text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        tabIndex={0}
                        role="button"
                        onClick={() => { setPlayerMovie(film); setShowPlayer(true); }}
                      >
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Related Videos Section */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#60A5FA"/>
              <path d="M10 9L15 12L10 15V9Z" fill="white"/>
            </svg>
            Related Videos
          </h2>
          <div className="flex gap-4 flex-wrap justify-start items-start pb-4">
            {musicVideos.map((video) => (
              <div
                key={video.title}
                className="group min-w-[170px] max-w-[170px] h-[250px] bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105 z-10 ring-0 group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-opacity-80 group-hover:shadow-blue-400/50"
                tabIndex={0}
                role="button"
              >
                <img
                  src={video.src}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-2xl"
                  draggable={false}
                />
                {/* Overlay on hover only */}
                <div className="absolute left-0 bottom-0 w-full bg-zinc-900/95 rounded-b-2xl p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-gray-300 text-xs mb-0.5">
                    <span role="img" aria-label="language">🌐</span> Bengali
                  </div>
                  <span className="text-white font-bold text-xs mb-0.5">{video.genre}</span>
                  <h3 className="text-sm font-bold text-white mb-1">{video.title}</h3>
                  <div className="flex items-end w-full gap-2 mt-auto">
                    <button
                      type="button"
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-lg font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      tabIndex={0}
                      aria-label="Add to Watch List"
                    >
                      +
                    </button>
                    <a
                      href={`/music-videos/${toSlug(video.title)}`}
                      className="flex-1 bg-blue-400 hover:bg-blue-500 text-zinc-900 text-xs font-bold py-1 rounded-lg transition shadow-lg text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                      tabIndex={0}
                      role="button"
                    >
                      Play Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Go to Top Arrow */}
      {showGoTop && (
        <button
          onClick={handleGoTop}
          className="fixed bottom-8 right-8 z-50 bg-zinc-900 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Go to top"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="currentColor"/>
            <path d="M14 9L14 19" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 14L14 9L19 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      <Player open={showPlayer} onClose={() => setShowPlayer(false)} movie={playerMovie} />
    </>
  );
} 