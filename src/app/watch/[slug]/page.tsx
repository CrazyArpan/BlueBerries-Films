"use client";
import React, { useMemo, use } from "react";
import Player from "@/app/components/Player";
import { useRouter } from "next/navigation";

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
  // ... (add all other movies from MoviePageClient)
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

export default function WatchPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = use(params);
  const movie = useMemo(() => featuredMovies.find(m => m.slug === slug), [slug]);

  if (!movie) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <button onClick={() => router.back()} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition">Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start py-8 px-2">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <Player open={true} onClose={() => router.back()} movie={movie} showFullPageButton={false} fullPage={true} />
        <div className="w-full max-w-3xl mx-auto mt-8 bg-zinc-900/90 rounded-xl p-8 shadow-lg border border-zinc-800">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{movie.title}</h1>
          <div className="text-gray-300 mb-2">Genre: {movie.genre} | Duration: {movie.duration}</div>
          <div className="text-gray-400 mb-4">{movie.tags?.join(", ")}</div>
          <div className="text-white text-lg leading-relaxed">{movie.description}</div>
        </div>
      </div>
    </div>
  );
}