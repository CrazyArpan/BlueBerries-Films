import React from 'react';
import { Metadata } from 'next';
import MusicVideoPageClient from './MusicVideoPageClient';

const musicVideos = [
  {
    slug: 'bondhu-dekha-hobe',
    title: 'Bondhu Dekha Hobe',
  },
  {
    slug: 'tui-je-amar-noy',
    title: 'Tui Je Amar Noy',
  },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const video = musicVideos.find(m => m.slug === params.slug);
  return {
    title: video ? `${video.title} - BlueBerries Films` : 'Music Video - BlueBerries Films',
    description: video ? `Watch ${video.title} music video by BlueBerries Films` : 'Watch our latest music videos',
  };
}

export default function MusicVideoPage({ params }: { params: { slug: string } }) {
  return <MusicVideoPageClient slug={params.slug} />;
}