"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

interface BlogSearchProps {
  posts: any[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [search, setSearch] = useState("");
  
  function stripReadMoreLink(html: string) {
    return html.replace(/<a [^>]*>.*?<\/a>/gi, '');
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  const filteredPosts = posts.filter((post: any) =>
    post.title.rendered.toLowerCase().includes(search.toLowerCase()) ||
    post.excerpt.rendered.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles, news, and updates..."
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-zinc-800/50 backdrop-blur-sm text-white border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 text-lg shadow-lg transition-all duration-300 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-400 text-lg">
          {filteredPosts.length === 0 
            ? "No articles found" 
            : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} found`
          }
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="text-gray-400 text-xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No blog posts match your search.</p>
            <p className="text-gray-500 text-sm mt-2">Try different keywords or browse all articles.</p>
          </div>
        )}
        
        {filteredPosts.map((post: any) => (
          <article 
            key={post.id} 
            className="group bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl p-6 border border-zinc-700/30 hover:border-red-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-400/10"
          >
            {/* Post Header */}
            <div className="mb-4">
              <h2
                className="text-xl font-bold mb-3 text-white group-hover:text-red-300 transition-colors duration-300 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-red-400" />
                  <span>{formatDate(post.date)}</span>
                </div>
                {post._embedded?.author && (
                  <div className="flex items-center gap-1">
                    <FaUser className="text-red-400" />
                    <span>{post._embedded.author[0]?.name || 'BlueBerries Team'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Post Excerpt */}
            <div
              className="prose prose-invert max-w-none text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: stripReadMoreLink(post.excerpt.rendered) }}
            />

            {/* Read More Link */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm group/link transition-all duration-300"
            >
              <span>Read Full Article</span>
              <FaArrowRight className="group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          </article>
        ))}
      </div>

      {/* Load More Section (if needed) */}
      {filteredPosts.length > 0 && (
        <div className="text-center pt-8">
          <div className="text-gray-500 text-sm">
            Showing {filteredPosts.length} of {posts.length} articles
          </div>
        </div>
      )}
    </div>
  );
} 