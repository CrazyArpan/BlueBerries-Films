import React from "react";
import { Metadata } from "next";
import MusicVideoPageClient from "./MusicVideoPageClient";

const musicVideos = [
  {
    slug: "bondhu-dekha-hobe",
    title: "Bondhu Dekha Hobe",
  },
  {
    slug: "tui-je-amar-noy",
    title: "Tui Je Amar Noy",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = musicVideos.find((m) => m.slug === slug);
  return {
    title: video
      ? `${video.title} - BlueBerries Films`
      : "Music Video - BlueBerries Films",
    description: video
      ? `Watch ${video.title} music video by BlueBerries Films`
      : "Watch our latest music videos",
  };
}

export default async function MusicVideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MusicVideoPageClient slug={slug} />;
}
