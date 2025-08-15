"use client";
import React, { useState } from 'react';
import Player from "@/app/components/Player";

export default function RedFilesClient() {
  const [showFull, setShowFull] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const video = {
    src: 'https://blueberriesfilms.com/wp-content/uploads/2025/07/The-Red-Files-2024.jpeg',
    title: 'The Red Files',
    genre: 'Movie',
    description: 'A gripping thriller from BlueBerries Films. (Add more details here later.)',
  };
  return (
    <div className="w-full pt-24" style={{ background: '#000' }}>
      <div className="relative w-full mx-auto" style={{ aspectRatio: '16/9', background: '#222' }}>
        <img
          src={video.src}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-contain object-center"
          draggable={false}
        />
        <div className="absolute inset-0 flex flex-col justify-end items-start w-full px-4 md:px-8 pb-12 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
          <span className="text-white/80 font-semibold text-lg mb-2 block">{video.genre}</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">{video.title}</h1>
          <div className="text-white/90 text-lg mb-4">
            Genre: {video.genre} | Language: Bengali | Status: Upcoming | Studio: Blueberries Originals
          </div>
          <div className={`text-white/90 text-base max-w-2xl leading-relaxed mb-4 ${showFull ? '' : 'line-clamp-2'}`}
            style={!showFull ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' } : {}}>
            {video.description}
          </div>
          {!showFull && (
            <button
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded shadow mb-4 transition"
              onClick={() => setShowFull(true)}
            >
              Read More
            </button>
          )}
          {showFull && (
            <div className="text-white/80 text-base mb-4">
              <div>Genre: {video.genre}</div>
              <div>Status: Upcoming</div>
              <div>Studio: Blueberries Originals</div>
            </div>
          )}
          <div className="flex gap-4 mt-4 items-center">
            <button
              type="button"
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 w-fit transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
              onClick={() => setShowPlayer(true)}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="2" />
                <polygon points="12,10 20,14 12,18" fill="white" />
              </svg>
              <span className="font-bold text-lg md:text-xl">Start Watching</span>
            </button>
            <button type="button" className="flex items-center gap-3 bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 w-fit text-lg md:text-xl cursor-pointer">
              <span className="text-2xl font-bold">+</span>
              <span className="font-bold">Watch List</span>
            </button>
            <button type="button" aria-label="Like" className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 26.5C16 26.5 6 19.5 6 13.5C6 10.5 8.5 8 11.5 8C13.2 8 14.7 9 15.5 10.2C16.3 9 17.8 8 19.5 8C22.5 8 25 10.5 25 13.5C25 19.5 16 26.5 16 26.5Z" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <button type="button" aria-label="Share" className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="16" r="2" fill="white" />
                <circle cx="24" cy="8" r="2" fill="white" />
                <circle cx="24" cy="24" r="2" fill="white" />
                <line x1="9.5" y1="15.5" x2="22" y2="9.5" stroke="white" strokeWidth="2" />
                <line x1="9.5" y1="16.5" x2="22" y2="22.5" stroke="white" strokeWidth="2" />
              </svg>
            </button>
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
      <Player open={showPlayer} onClose={() => setShowPlayer(false)} />
    </div>
  );
} 