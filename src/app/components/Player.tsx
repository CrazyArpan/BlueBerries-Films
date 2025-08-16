"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { FaExpand } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Player({
  open,
  onClose,
  movie,
  showFullPageButton = true,
  fullPage = false,
}: {
  open: boolean;
  onClose: () => void;
  movie?: {
    src: string;
    title: string;
    genre?: string;
    duration?: string;
    description?: string;
    tags?: string[];
    slug?: string;
  };
  showFullPageButton?: boolean;
  fullPage?: boolean;
}) {
  // All hooks must be at the top level
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);
  const videoAreaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  // For fullPage mode: controls auto-hide
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handler to show controls on mouse move (fullPage only)
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 2000);
  };

  // Listen for fullscreen changes (fullPage only)
  useEffect(() => {
    if (!fullPage) return;
    const onFullscreenChange = () => {
      setShowControls(true);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [fullPage]);

  // Only auto-hide controls in fullscreen and when playing (fullPage only)
  const isFullscreen =
    typeof document !== "undefined" && document.fullscreenElement;
  const shouldAutoHide = fullPage && isFullscreen && playing;

  useEffect(() => {
    if (currentTime >= duration) {
      router.push("/");
    }
  }, [currentTime, duration, router]);

  const handleFullscreen = () => {
    if (videoAreaRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoAreaRef.current.requestFullscreen();
      }
    }
  };

  if (!open) return null;

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-start bg-black"
        onMouseMove={shouldAutoHide ? handleMouseMove : undefined}
      >
        {/* Blurred background image if movie provided */}
        {movie?.src && (
          <img
            src={movie.src}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-lg pointer-events-none select-none"
            aria-hidden="true"
          />
        )}
        {/* Overlay for darkening */}
        <div
          className="absolute inset-0 bg-black/80 pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Movie title */}
        {movie?.title && (
          <h2 className="z-10 text-white text-3xl font-bold mb-6 text-center drop-shadow-lg mt-8">
            {movie.title}
          </h2>
        )}
        {/* Video area - edge-to-edge, no rounded corners or shadow */}
        <div
          ref={videoAreaRef}
          className="w-full max-w-5xl aspect-video bg-zinc-800 flex items-center justify-center mb-4 border border-zinc-700 z-10 cursor-pointer"
          style={{ borderRadius: 0, boxShadow: "none" }}
          title="Click to toggle fullscreen"
        >
          <video
            ref={videoRef}
            src={movie?.src}
            className="w-full h-full"
            controls={false}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onTimeUpdate={() => {
              if (videoRef.current)
                setCurrentTime(videoRef.current.currentTime);
            }}
            onEnded={() => router.push("/")}
            autoPlay={playing}
            style={{ background: "black" }}
          />
        </div>
        {/* Controls - auto-hide in fullscreen when playing */}
        <div
          className={`w-full max-w-3xl flex flex-col gap-4 items-center z-10 transition-opacity duration-300 ${shouldAutoHide && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          {/* Timeline slider */}
          <input
            ref={sliderRef}
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              setCurrentTime(time);
              if (videoRef.current) videoRef.current.currentTime = time;
            }}
            className="w-full accent-red-600 h-2 rounded-lg appearance-none bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="flex items-center gap-6 mt-2">
            <button
              className="text-white text-2xl bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Backward"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.max(
                    0,
                    videoRef.current.currentTime - 10,
                  );
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
            >
              <FaBackward />
            </button>
            <button
              className="text-white text-3xl bg-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                    setPlaying(true);
                  } else {
                    videoRef.current.pause();
                    setPlaying(false);
                  }
                }
              }}
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="text-white text-2xl bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Forward"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.min(
                    duration,
                    videoRef.current.currentTime + 10,
                  );
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
            >
              <FaForward />
            </button>
            {/* Maximize button */}
            <button
              className="text-white text-2xl bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-yellow-400 hover:text-zinc-900 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Fullscreen"
              onClick={handleFullscreen}
              type="button"
            >
              <FaExpand />
            </button>
          </div>
          {/* Timestamp */}
          <div className="text-gray-300 text-sm mt-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-2xl bg-zinc-900 rounded-xl shadow-2xl p-8 flex flex-col items-center border border-zinc-700 overflow-hidden">
        {/* Blurred background image if movie provided */}
        {movie?.src && (
          <img
            src={movie.src}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-lg pointer-events-none select-none"
            aria-hidden="true"
          />
        )}
        {/* Overlay for darkening */}
        <div
          className="absolute inset-0 bg-black/60 pointer-events-none select-none"
          aria-hidden="true"
        />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl bg-zinc-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
          aria-label="Close player"
        >
          ×
        </button>
        {/* Open in Full Page button */}
        {showFullPageButton && movie?.slug && (
          <button
            onClick={() => {
              onClose();
              setTimeout(() => router.push(`/watch/${movie.slug}`), 100);
            }}
            className="absolute top-4 left-4 text-white bg-yellow-500 hover:bg-yellow-400 font-bold px-4 py-2 rounded-lg shadow transition z-10"
          >
            Open in Full Page
          </button>
        )}
        {/* Movie title */}
        {movie?.title && (
          <h2 className="z-10 text-white text-2xl font-bold mb-4 text-center drop-shadow-lg">
            {movie.title}
          </h2>
        )}
        {/* Placeholder for video - this is what will go fullscreen */}
        <div
          ref={videoAreaRef}
          className="w-full aspect-video bg-zinc-800 flex items-center justify-center rounded-lg mb-6 border border-zinc-700 z-10 cursor-pointer"
          onClick={handleFullscreen}
          title="Click to toggle fullscreen"
        >
          <video
            ref={videoRef}
            src={movie?.src}
            className="w-full h-full"
            controls={false}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onTimeUpdate={() => {
              if (videoRef.current)
                setCurrentTime(videoRef.current.currentTime);
            }}
            onEnded={() => router.push("/")}
            autoPlay={playing}
            style={{ background: "black" }}
          />
        </div>
        {/* Controls */}
        <div className="w-full flex flex-col gap-4 items-center z-10">
          {/* Timeline slider */}
          <input
            ref={sliderRef}
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              setCurrentTime(time);
              if (videoRef.current) videoRef.current.currentTime = time;
            }}
            className="w-full accent-red-600 h-2 rounded-lg appearance-none bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="flex items-center gap-6 mt-2">
            <button
              className="text-white text-2xl bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Backward"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.max(
                    0,
                    videoRef.current.currentTime - 10,
                  );
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
            >
              <FaBackward />
            </button>
            <button
              className="text-white text-3xl bg-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                    setPlaying(true);
                  } else {
                    videoRef.current.pause();
                    setPlaying(false);
                  }
                }
              }}
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="text-white text-2xl bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Forward"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.min(
                    duration,
                    videoRef.current.currentTime + 10,
                  );
                  setCurrentTime(videoRef.current.currentTime);
                }
              }}
            >
              <FaForward />
            </button>
            {/* Fullscreen button */}
            <button
              className="text-white text-2xl bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-yellow-400 hover:text-zinc-900 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Fullscreen"
              onClick={handleFullscreen}
              type="button"
            >
              <FaExpand />
            </button>
          </div>
          {/* Timestamp */}
          <div className="text-gray-300 text-sm mt-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
