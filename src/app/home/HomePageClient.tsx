"use client";

import Link from "next/link";
import { FaHome, FaInfoCircle, FaCalendarAlt, FaTv, FaShoppingBag, FaHeart, FaTags, FaBlog, FaUserTie, FaEnvelope, FaSearch, FaShoppingCart, FaUserCircle, FaCrown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import FloatingNavBar from "./FloatingNavBar";
import React, { useState, useEffect, useRef } from "react";

const navOptions = [
  { name: "Home", icon: <FaHome />, href: "/home" },
  { name: "About Us", icon: <FaInfoCircle />, href: "/about" },
  { name: "Upcoming", icon: <FaCalendarAlt />, href: "/upcoming" },
  { name: "Live TV", icon: <FaTv />, href: "/live-tv" },
  { name: "Shop", icon: <FaShoppingBag />, href: "/shop" },
  { name: "Wishlist", icon: <FaHeart />, href: "/wishlist" },
  { name: "Pricing Plan", icon: <FaTags />, href: "/pricing" },
  { name: "Blog", icon: <FaBlog />, href: "/blog" },
  { name: "Angel Investors", icon: <FaUserTie />, href: "/investors" },
  { name: "Contact Us", icon: <FaEnvelope />, href: "/contact" },
  { name: "Search", icon: <FaSearch />, href: "/search" },
  { name: "Cart", icon: <FaShoppingCart />, href: "/cart" },
];

const sliderImages = [
  "https://blueberriesfilms.com/wp-content/uploads/2025/07/The-Red-Files-2024.jpeg",
  "https://blueberriesfilms.com/wp-content/uploads/2025/07/Tui-Je-Amar-Noi.jpg",
  "https://blueberriesfilms.com/wp-content/uploads/2025/07/bandhu-dekha-hobe.jpg",
];

// Overlay data for each slider image
const sliderOverlays = [
  {
    title: 'The Red Files',
    rating: 8.5,
    duration: '2h : 15m',
    stars: 'Mumtaz Sorcar, Kinjal Nanda, Bidipta Chakraborty',
    genres: 'Crime',
    showRating: true,
    showTrailer: true,
    subtitle: '',
  },
  {
    title: 'Tui Je Amar Noy',
    rating: null,
    duration: '',
    stars: 'Papon',
    genres: 'Romance',
    showRating: false,
    showTrailer: false,
    subtitle: 'তুই যে আমার নয় | Papon | Tui Je Amar Noy | The Red Files | Taniqsha R | Abhirup C | Bangla Gaan',
    details: 'Title: Tui Je Amar Noy Singer: Papon Music Director: Soumya Rit Lyricist: Soumya Rit Featuring Starcast: Taniqsha Roy & Abhirup Chowdhury',
  },
  {
    title: 'Bondhu Dekha Hobe',
    rating: null,
    duration: '',
    stars: 'Nachiketa Chakraborty',
    genres: 'Drama',
    showRating: false,
    showTrailer: false,
    subtitle: 'Bondhu Dekha Hobe | Nachiketa Chakraborty | The Red Files | Mumtaz | Kinjal',
    details: 'Title: Bondhu Dekha Hobe Singer: Nachiketa Chakraborty Music Director: The Red Files Featuring Starcast: Mumtaz & Kinjal',
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 12000); // 12 seconds
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setAnimationKey(prev => prev + 1);
  };
  const prev = () => {
    setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    setAnimationKey(prev => prev + 1);
  };
  const next = () => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
    setAnimationKey(prev => prev + 1);
  };

  const rowRef = useRef<HTMLDivElement>(null);
  const moviesRowRef = useRef<HTMLDivElement>(null);

  // For popup modal and watchlist
  const [openCard, setOpenCard] = useState<{ section: string; idx: number } | null>(null);
  const [watchlist, setWatchlist] = useState<{ [key: string]: boolean }>({});
  const [hovered, setHovered] = useState<number | null>(null);

  // Data for upcoming films sections (new images)
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
  ];

  // Data for Featured Movies section (new images)
  const featuredMovies = [
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Tomar-Amar-Google-Meet-Bengali-Movie-Blue-Berries.jpg",
      title: "Tomar Amar Google Meet",
      genre: "Romance",
      duration: "30-40 minutes",
      description: "Two co-workers battle it out over Google Meet—only to find love hidden in emojis, memes, and missed deadlines.",
      tags: ["45 Mins Movie", "Romance"]
    },
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Jhalmuri-Junction-Bengali-Movie-Blueberries.jpg",
      title: "Jhalmuri Junction",
      genre: "Romance",
      duration: "35-45 minutes",
      description: "Two strangers miss their trains, share jhalmuri on a foggy platform, and discover that sometimes a missed train takes you to the right destination.",
      tags: ["45 Mins Movie", "Romance"]
    },
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Facebook-first-Love-Bengali-Movie-Blue-Berries-OTT.jpg",
      title: "Facebook-e First Love",
      genre: "Romance",
      duration: "30-40 minutes",
      description: "Aniket accidentally sends a Facebook message to Mallika — only to discover they were classmates in the same school but never once crossed paths.",
      tags: ["45 Mins Movie", "Romance"]
    },
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Chuti-Bela-Blueberries-Bengali-Movie.jpg",
      title: "Chuti Bela",
      genre: "Romance",
      duration: "30-40 minutes",
      description: "Old rivals, a school play, and a village soaked in nostalgia — where childhood banter turns into grown-up blushes.",
      tags: ["45 Mins Movie", "Romance"]
    },
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Rang-Pencil-Bengali-movie-Blueberries-Movie-streaming-platform.jpg",
      title: "Rong Pencil",
      genre: "Romance",
      duration: "30-35 minutes",
      description: "When a cartoonist loses his words, he finds them again in the colors of silence. A story where love is drawn, not spoken.",
      tags: ["45 Mins Movie", "Romance"]
    },
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Ektu-Prem-Ektu-Chatpata-Bangla-Film-2025.jpg",
      title: "Ektu Prem, Ektu Chatpata",
      genre: "Romance",
      duration: "35 minutes",
      description: "Love, like chotpoti, is best when it burns just a little. One street vendor's charm meets a no-nonsense law student—and sparks fly with every bite.",
      tags: ["45 Mins Movie", "Romance"]
    },
    {
      src: "https://blueberriesfilms.com/wp-content/uploads/2025/07/Crush-E-Click-Bengali-Film-2025.jpg",
      title: "Crush-e Click",
      genre: "Romance",
      duration: "30-45 minutes",
      description: "A quirky girl. A delivery boy. Countless online orders… and one accidental love story that clicks right where it matters— the heart.",
      tags: ["45 Mins Movie", "Romance"]
    },
    
  ];
  const movies = featuredMovies; // Use featuredMovies for the Featured Movies section
  const [musicIndex, setMusicIndex] = useState(0);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setMusicIndex((prev) => (prev + 1) % musicVideos.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  // 2. Fix right arrow logic for sliders
  // For both sliders, add logic to check if scrolling is possible and disable the right arrow if at the end.
  // Example for films:
  const [canScrollRight, setCanScrollRight] = useState(true);
  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      setCanScrollRight(el.scrollWidth - el.scrollLeft > el.clientWidth + 10);
    }
  }, [films]);

  // Marquee animation keyframes
  const marqueeStyle = {
    animation: 'marquee 30s linear infinite',
  };
  // Add this to your global CSS or in a <style jsx global> block:
  // @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  // Find the index of 'The Red Files' in sliderImages
  const redFilesIndex = sliderImages.findIndex(src => src.includes('The-Red-Files-2024'));

  // Add state and refs for scroll position
  const filmsRowRef = useRef<HTMLDivElement>(null);
  const [filmsAtStart, setFilmsAtStart] = useState(true);
  const [filmsAtEnd, setFilmsAtEnd] = useState(false);

  const checkFilmsScroll = () => {
    const el = filmsRowRef.current;
    if (el) {
      setFilmsAtStart(el.scrollLeft === 0);
      setFilmsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkFilmsScroll();
    const el = filmsRowRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkFilmsScroll);
    return () => el.removeEventListener('scroll', checkFilmsScroll);
  }, []);

  const scrollFilms = (dir: 'left' | 'right') => {
    const el = filmsRowRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [moviesAtStart, setMoviesAtStart] = useState(true);
  const [moviesAtEnd, setMoviesAtEnd] = useState(false);

  const checkMoviesScroll = () => {
    const el = moviesRowRef.current;
    if (el) {
      setMoviesAtStart(el.scrollLeft === 0);
      setMoviesAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkMoviesScroll();
    const el = moviesRowRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkMoviesScroll);
    return () => el.removeEventListener('scroll', checkMoviesScroll);
  }, []);

  const scrollMovies = (dir: 'left' | 'right') => {
    const el = moviesRowRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [showPiP, setShowPiP] = useState(false);

  return (
    <div className="flex flex-col bg-black">
      <FloatingNavBar />
      {/* PiP Overlay rendered at root so it persists across slides */}
      {showPiP && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70" onClick={() => setShowPiP(false)}>
          <div className="relative w-[90vw] max-w-xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/LBK7IskCKDc?autoplay=1"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
            <button
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-red-600 transition"
              onClick={() => setShowPiP(false)}
              aria-label="Close PiP"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Slider */}
      <div className="relative w-full aspect-[16/9] bg-black overflow-hidden mt-20">
        {sliderImages.map((src, idx) => (
          <div key={src} className="absolute top-0 left-0 w-full h-full">
            <img
              src={src}
              alt={`slide-${idx}`}
              className={`w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              draggable={false}
            />
          </div>
        ))}
        
        <AnimatePresence mode="wait">
          {sliderImages.map((src, idx) => (
            idx === current && (
              <motion.div 
                key={`slide-${animationKey}`}
                className="absolute inset-0 flex flex-col justify-center items-start bg-gradient-to-r from-black/70 via-black/40 to-transparent p-12 z-20 pointer-events-auto"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {sliderOverlays[idx].subtitle ? (
                  <motion.h2 
                    key={`subtitle-${current}`}
                    className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 max-w-lg text-left" 
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
                    initial={{ x: 200, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -200, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    {sliderOverlays[idx].subtitle}
                  </motion.h2>
                ) : (
                  <motion.h2 
                    key={`title-${current}`}
                    className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 max-w-lg text-left" 
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
                    initial={{ x: 200, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -200, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    {sliderOverlays[idx].title}
                  </motion.h2>
                )}
                {sliderOverlays[idx].showRating && (
                  <motion.div 
                    key={`rating-${current}`}
                    className="flex items-center gap-3 mb-3"
                    initial={{ x: 150, opacity: 0, y: 20 }}
                    animate={{ x: 0, opacity: 1, y: 0 }}
                    exit={{ x: -150, opacity: 0, y: -20 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  >
                    <span className="text-yellow-400 text-base">★</span>
                    <span className="text-yellow-400 text-base">★</span>
                    <span className="text-yellow-400 text-base">★</span>
                    <span className="text-yellow-400 text-base">★</span>
                    <span className="text-yellow-400 text-base">☆</span>
                    <span className="text-white text-base font-bold ml-2">{sliderOverlays[idx].rating}</span>
                    <span className="bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs ml-2">IMDb</span>
                    <span className="text-white text-base ml-4">⏱ {sliderOverlays[idx].duration}</span>
                  </motion.div>
                )}
                {sliderOverlays[idx].stars && (
                  <motion.div 
                    key={`stars-${current}`}
                    className="mb-1"
                    initial={{ x: 180, opacity: 0, rotateY: 90 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    exit={{ x: -180, opacity: 0, rotateY: -90 }}
                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                  >
                    <span className="text-white text-base font-semibold">Starring:</span>
                    <span className="text-red-400 text-base font-semibold ml-2">{sliderOverlays[idx].stars}</span>
                  </motion.div>
                )}
                {sliderOverlays[idx].genres && (
                  <motion.div 
                    key={`genres-${current}`}
                    className="mb-4"
                    initial={{ x: 160, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -160, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                  >
                    <span className="text-white text-base font-semibold">Genres:</span>
                    <span className="text-red-400 text-base font-semibold ml-2">{sliderOverlays[idx].genres}</span>
                  </motion.div>
                )}
                {sliderOverlays[idx].details && (
                  <motion.div 
                    key={`details-${current}`}
                    className="text-white text-base md:text-lg font-semibold mb-6 max-w-lg text-left"
                    initial={{ x: 140, opacity: 0, y: 30 }}
                    animate={{ x: 0, opacity: 1, y: 0 }}
                    exit={{ x: -140, opacity: 0, y: -30 }}
                    transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
                  >
                    {sliderOverlays[idx].details}
                  </motion.div>
                )}
                <motion.div 
                  key={`buttons-${current}`}
                  className="flex items-center gap-6 mt-4"
                  initial={{ x: 120, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -120, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
                >
                  <Link
                    href={`/movies/${toSlug(sliderOverlays[idx].title)}`}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded text-lg transition shadow-lg flex items-center gap-2 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
                  >
                    Play Now <span className="text-xl">▶</span>
                  </Link>
                  {/* New Animated Watch Trailer Button */}
                  {sliderOverlays[idx].showTrailer && (
                    <AnimatedWatchTrailerButton setShowPiP={setShowPiP} />
                  )}
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        {/* Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-20"
          onClick={prev}
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-20"
          onClick={next}
          aria-label="Next slide"
        >
          &#8594;
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-red-500" : "bg-white/50"}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Animated Offer Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.25 }
          }
        }}
        className="w-full bg-black py-12 flex flex-col items-center"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 text-center"
        >
          Most Boldest Release This Year
        </motion.h2>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="w-full bg-yellow-400 text-black text-3xl md:text-4xl font-bold text-center py-2 mb-2 rounded max-w-6xl"
        >
          Releaseing 15th August 2025
        </motion.div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="flex flex-col items-center md:items-start w-full md:w-1/2"
          >
            <motion.img
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              src="https://blueberriesfilms.com/wp-content/uploads/2025/07/The-Red-Files-2024.jpeg"
              alt="The Red Files"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="flex-1 flex flex-col items-center md:items-start w-full md:w-1/2"
          >
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="text-4xl font-bold text-white mb-4 text-center md:text-left"
            >
              The Red Files
            </motion.h3>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="bg-red-800 text-white p-6 rounded-lg mb-4 w-full text-lg font-semibold"
            >
              Title: The Red Files (2024)<br />
              Genre: Thriller<br />
              Based on: The true event of the Bantala Rape Case in the 1990s, West Bengal<br />
              IMDb: 8.5/10
            </motion.div>
            <motion.h4
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="text-3xl font-bold text-yellow-400 mb-4 text-center md:text-left"
            >
              There is an offer for you
            </motion.h4>
            <motion.button
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="bg-green-600 hover:bg-green-700 text-white text-2xl font-bold px-8 py-4 rounded-lg shadow-lg transition"
            >
              Grab The Offer Today
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
      {/* Third Section: Upcoming 45 Mins Films */}
      <section className="w-full bg-black py-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Upcoming 45 Mins Films</h2>
        <div className="w-full h-[320px] overflow-x-hidden relative">
          {/* Left Arrow */}
          {!filmsAtStart && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-20 shadow-lg"
              onClick={() => scrollFilms('left')}
              aria-label="Scroll left"
            >
              &#8592;
            </button>
          )}
          {/* Right Arrow */}
          {filmsAtStart && !filmsAtEnd && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-20 shadow-lg"
              onClick={() => scrollFilms('right')}
              aria-label="Scroll right"
            >
              &#8594;
            </button>
          )}
          <div
            ref={filmsRowRef}
            className="flex gap-6 px-4 h-full overflow-x-auto scrollbar-hide"
            tabIndex={-1}
            onWheel={e => e.preventDefault()}
            style={{ scrollBehavior: 'smooth' }}
          >
            {films.map((film, idx) => (
              <div
                key={film.src + '-' + idx}
                className="group min-w-[220px] max-w-[220px] h-[320px] bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105 z-10"
              >
                <img
                  src={film.src}
                  alt={`upcoming-film-${idx}`}
                  className="w-full h-full object-cover rounded-2xl"
                  draggable={false}
                />
                {/* Overlay on hover */}
                <div className="absolute left-0 bottom-0 w-full bg-zinc-900/95 rounded-b-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <span role="img" aria-label="language">🌐</span> Bengali
                  </div>
                  <span className="text-gray-300 font-semibold">{film.genre}</span>
                  <h3 className="text-lg font-bold text-white">{film.title}</h3>
                  <div className="flex items-center w-full gap-4 mt-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors cursor-pointer relative ${watchlist[`films-${idx}`] ? 'bg-red-700 text-white' : 'bg-zinc-800 text-white'}`}
                      onClick={() => setWatchlist(w => ({ ...w, [`films-${idx}`]: !w[`films-${idx}`] }))}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {watchlist[`films-${idx}`] ? '✓' : '+'}
                      {hovered === idx && (
                        <span className="absolute left-12 bg-zinc-900 text-white text-xs rounded px-2 py-1 shadow-lg border border-zinc-700 whitespace-nowrap">
                          {watchlist[`films-${idx}`] ? 'Remove from watch list' : 'Add to watch list'}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/movies/${toSlug(film.title)}`}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-base font-bold py-2 rounded-lg transition shadow-lg text-center cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Web Series Section: No Data Found */}
      <section className="w-full bg-black py-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Upcoming Web Series</h2>
        <div className="w-full flex items-center justify-center">
          <div className="bg-zinc-900 text-white text-xl font-semibold rounded-lg px-8 py-6 border border-red-500" style={{ minWidth: 300 }}>
            No Data Found
          </div>
        </div>
      </section>
      {/* Fourth Section: Upcoming Movies */}
      <section className="w-full bg-black py-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Upcoming Movies</h2>
        <div className="relative w-full flex items-center overflow-x-hidden">
          {/* Left Arrow */}
          {!moviesAtStart && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-20 shadow-lg"
              onClick={() => scrollMovies('left')}
              aria-label="Scroll left"
            >
              &#8592;
            </button>
          )}
          {/* Right Arrow */}
          {moviesAtStart && !moviesAtEnd && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-20 shadow-lg"
              onClick={() => scrollMovies('right')}
              aria-label="Scroll right"
            >
              &#8594;
            </button>
          )}
          <div className="flex-1 overflow-hidden">
            <div ref={moviesRowRef} className="flex gap-6 overflow-x-auto px-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
              {films.map((film, idx) => (
                <div
                  key={film.src + '-' + idx}
                  className="group min-w-[220px] max-w-[220px] h-[320px] bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105 z-10"
                >
                  <img
                    src={film.src}
                    alt={`upcoming-movie-${idx}`}
                    className="w-full h-full object-cover rounded-2xl"
                    draggable={false}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute left-0 bottom-0 w-full bg-zinc-900/95 rounded-b-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <span role="img" aria-label="language">🌐</span> Bengali
                    </div>
                    <span className="text-gray-300 font-semibold">{film.genre}</span>
                    <h3 className="text-lg font-bold text-white">{film.title}</h3>
                    <div className="flex items-center w-full gap-4 mt-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors cursor-pointer relative ${watchlist[`movies-${idx}`] ? 'bg-red-700 text-white' : 'bg-zinc-800 text-white'}`}
                        onClick={() => setWatchlist(w => ({ ...w, [`movies-${idx}`]: !w[`movies-${idx}`] }))}
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {watchlist[`movies-${idx}`] ? '✓' : '+'}
                        {hovered === idx && (
                          <span className="absolute left-12 bg-zinc-900 text-white text-xs rounded px-2 py-1 shadow-lg border border-zinc-700 whitespace-nowrap">
                            {watchlist[`movies-${idx}`] ? 'Remove from watch list' : 'Add to watch list'}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/movies/${toSlug(film.title)}`}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-base font-bold py-2 rounded-lg transition shadow-lg text-center cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
                      >
                        Play Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Fifth Section: Music Video */}
      <section className="w-full bg-black py-12 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-left w-full max-w-7xl px-4">Music Video</h2>
        <div className="w-full max-w-7xl flex justify-start items-center gap-8 px-4 relative" style={{ overflow: 'hidden' }}>
          {musicVideos.map((film, idx) => (
            <div
              key={film.src}
              className="group min-w-[220px] max-w-[220px] h-[320px] bg-zinc-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105 z-10"
              style={{ position: 'relative' }}
            >
              <img
                src={film.src}
                alt={`music-video-${idx}`}
                className="w-full h-full object-cover rounded-2xl"
                draggable={false}
              />
              {/* Overlay on hover for all */}
              <div className="absolute left-0 bottom-0 w-full bg-zinc-900/95 rounded-b-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <span role="img" aria-label="language">🌐</span> Bengali
                </div>
                <span className="text-gray-300 font-semibold">{film.genre}</span>
                <h3 className="text-lg font-bold text-white">{film.title}</h3>
                <div className="flex items-center w-full gap-4 mt-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors cursor-pointer relative ${watchlist[`music-${idx}`] ? 'bg-red-700 text-white' : 'bg-zinc-800 text-white'}`}
                    onClick={() => setWatchlist(w => ({ ...w, [`music-${idx}`]: !w[`music-${idx}`] }))}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {watchlist[`music-${idx}`] ? '✓' : '+'}
                    {hovered === idx && (
                      <span className="absolute left-12 bg-zinc-900 text-white text-xs rounded px-2 py-1 shadow-lg border border-zinc-700 whitespace-nowrap">
                        {watchlist[`music-${idx}`] ? 'Remove from watch list' : 'Add to watch list'}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/music-videos/${toSlug(film.title)}`}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-base font-bold py-2 rounded-lg transition shadow-lg text-center cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Last Section: Featured Movies Vertical Selector */}
      <section className="w-full bg-black py-12 flex flex-col items-center">
        <FeaturedMoviesSection movies={movies} />
      </section>
    </div>
  );
}

function FeaturedMoviesSection({ movies }: { movies: { src: string; title: string; genre: string; description?: string; imdb?: string; duration?: string; tags?: string[] }[] }) {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  const handleMovieChange = (index: number) => {
    setSelectedMovieIndex(index);
  };

  return (
    <div className="w-full max-w-7xl px-4">
      <div className="relative">

        
        {/* Card with movie background */}
        <div 
          className="relative border border-red-500 rounded-3xl p-8 shadow-2xl transition-all duration-700 overflow-hidden"
        >
          <img
            src={movies[selectedMovieIndex].src}
            alt={movies[selectedMovieIndex].title}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            draggable={false}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
                    {/* Content */}
          <div className="relative z-10">
            <FeaturedMoviesVertical movies={movies} onMovieChange={handleMovieChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedMoviesVertical({ movies, onMovieChange }: { 
  movies: { src: string; title: string; genre: string; description?: string; imdb?: string; duration?: string; tags?: string[] }[], 
  onMovieChange?: (index: number) => void 
}) {
  const [selected, setSelected] = useState(0);
  const visibleCount = 3;
  const start = Math.max(0, Math.min(selected - 1, movies.length - visibleCount));
  const visibleMovies = movies.slice(start, start + visibleCount);

    // Handle movie selection
  const handleMovieSelect = (index: number) => {
    setSelected(index);
    onMovieChange?.(index);
  };

  return (
    <div className="w-full flex flex-row gap-8 items-center justify-center relative min-h-[420px]">
      {/* Vertical Card List */}
      <div className="flex flex-col gap-4 items-center relative z-10">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white mb-2 hover:bg-white/30 border border-white/30 transition-all duration-300"
          onClick={() => handleMovieSelect(Math.max(0, selected - 1))}
          disabled={selected === 0}
        >
          <span className="text-2xl">&#8593;</span>
        </button>
        {visibleMovies.map((movie, idx) => {
          const realIdx = start + idx;
          return (
            <div
              key={movie.src}
              className={`w-64 h-32 rounded-xl overflow-hidden shadow-lg flex items-end cursor-pointer relative transition-all duration-300 ${realIdx === selected ? 'ring-2 ring-red-500 ring-opacity-80 shadow-red-500/50' : 'ring-0'} bg-black`}
              onClick={() => handleMovieSelect(realIdx)}
            >
              <img
                src={movie.src}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 p-4 w-full flex items-center">
                <span className="text-lg font-bold text-white drop-shadow-lg">{movie.title}</span>
              </div>
            </div>
          );
        })}
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white mt-2 hover:bg-white/30 border border-white/30 transition-all duration-300"
          onClick={() => handleMovieSelect(Math.min(movies.length - 1, selected + 1))}
          disabled={selected === movies.length - 1}
        >
          <span className="text-2xl">&#8595;</span>
        </button>
      </div>
      {/* Details on the left */}
      <div className="flex-1 relative flex flex-col justify-center items-start min-h-[420px] order-1">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`movie-details-${selected}`}
            className="relative z-10 p-8 flex flex-col gap-4 w-full"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="text-white/80 font-semibold text-lg bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full w-fit"
              initial={{ x: 200, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              {movies[selected].genre}
            </motion.span>
            <motion.h3 
              className="text-4xl font-bold text-white mb-2 drop-shadow-lg"
              initial={{ x: 200, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              {movies[selected].title}
            </motion.h3>
            <motion.div 
              className="flex items-center gap-2 mb-2"
              initial={{ x: 150, opacity: 0, y: 20 }}
              animate={{ x: 0, opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              {movies[selected].title === 'The Red Files' && (
                <>
                  <span className="bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs">IMDb</span>
                  <span className="text-white text-lg font-semibold">{movies[selected].imdb || '8.5'}</span>
                </>
              )}
            </motion.div>
            <motion.div 
              className="text-white/90 text-base max-w-2xl leading-relaxed"
              initial={{ x: 140, opacity: 0, y: 30 }}
              animate={{ x: 0, opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              {movies[selected].description || 'Genre: Romantic Drama | Language: Bengali | Duration: 30–35 minutes Status: Upcoming | Studio: Blueberries Originals. When a cartoonist loses his words, he finds them again in the colors of silence...'}
            </motion.div>
            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mt-4"
              initial={{ x: 160, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            >
              {movies[selected].tags && movies[selected].tags.map((tag, index) => (
                <motion.span 
                  key={index} 
                  className="bg-red-500/20 backdrop-blur-sm text-red-300 text-sm px-3 py-1 rounded-full"
                  initial={{ x: 50, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + (index * 0.1), ease: "easeOut" }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
            <Link
              href={`/movies/${toSlug(movies[selected].title)}`}
              className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xl font-bold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 w-fit transform hover:scale-105 backdrop-blur-sm"
            >
              Play Now
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}

function AnimatedWatchTrailerButton({ setShowPiP }: { setShowPiP: (v: boolean) => void }) {
  return (
    <button
      onClick={() => { console.log('WATCH TRAILER clicked'); setShowPiP(true); }}
      className="group flex items-center gap-4 px-8 py-3 rounded-full border border-white bg-white/10 hover:bg-red-600 transition-colors duration-300 relative overflow-hidden"
      style={{ minWidth: 240 }}
    >
      <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white group-hover:border-red-500 transition-colors duration-300">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="2" className="group-hover:stroke-red-500 transition-colors duration-300" />
          <polygon points="13,11 23,16 13,21" fill="white" className="group-hover:fill-red-500 transition-colors duration-300" />
        </svg>
      </span>
      <span className="text-white text-xl font-semibold tracking-widest group-hover:text-white transition-colors duration-300">WATCH TRAILER</span>
    </button>
  );
} 

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
} 