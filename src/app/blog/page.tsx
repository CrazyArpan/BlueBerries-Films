import Link from "next/link";
import React from "react";
import BlogSearch from "./BlogSearch";

export const metadata = {
  title: "Blogs - BlueBerries Films",
  description: "Latest news, updates, and insights from BlueBerries Films - Your premier Bengali entertainment platform.",
};

export default async function BlogPage() {
  const res = await fetch("https://blueberriesfilms.com/wp-json/wp/v2/posts", { next: { revalidate: 60 } });
  const posts = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent">
            BlueBerries Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest news, behind-the-scenes stories, and exclusive insights from the world of Bengali cinema and entertainment.
          </p>
        </div>
        
        <BlogSearch posts={posts} />
      </div>
    </div>
  );
} 