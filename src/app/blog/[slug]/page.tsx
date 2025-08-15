import React from "react";
import { notFound } from "next/navigation";
import CommentsSection from "./CommentsSection";

interface Params {
  params: { slug: string };
}

async function getPostAndComments(slug: string) {
  const postRes = await fetch(
    `https://blueberriesfilms.com/wp-json/wp/v2/posts?slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const posts = await postRes.json();
  const post = posts[0];
  if (!post) return { post: null, comments: [] };
  const commentsRes = await fetch(
    `https://blueberriesfilms.com/wp-json/wp/v2/comments?post=${post.id}`,
    { next: { revalidate: 30 } }
  );
  const comments = await commentsRes.json();
  return { post, comments };
}

export default async function BlogPostPage({ params }: Params) {
  const { post, comments } = await getPostAndComments(params.slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto pt-32 pb-12 px-4">
      <h1
        className="text-4xl font-bold mb-6 text-white text-center"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="prose prose-invert max-w-none text-gray-300 mb-12"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      <CommentsSection postId={post.id} initialComments={comments} />
    </div>
  );
} 