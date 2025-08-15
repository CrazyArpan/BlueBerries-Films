import React from 'react';
import { Metadata } from 'next';
import MoviePageClient from './MoviePageClient';

const films = [
  { title: "Tomar Amar Google Meet" },
  { title: "Jhalmuri Junction" },
  { title: "Facebook-e First Love" },
  { title: "Chuti Bela" },
  { title: "Rong Pencil" },
  { title: "Ektu Prem, Ektu Chatpata" },
  { title: "Crush-e Click" },
  { title: "The Red Files" },
];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const movie = films.find(f => toSlug(f.title) === params.slug);
  return {
    title: movie ? `${movie.title} - BlueBerries Films` : 'BlueBerries Films',
  };
}

export default function MoviePage({ params }: { params: { slug: string } }) {
  return <MoviePageClient slug={params.slug} />;
} 