'use client';
import { useState } from "react";

export default function CommentsSection({ postId, initialComments }: { postId: number, initialComments: any[] }) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("https://blueberriesfilms.com/wp-json/wp/v2/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: postId,
          author_name: name,
          author_email: email,
          content,
        }),
      });
      if (res.ok) {
        setMessage("Your comment has been submitted and is awaiting moderation.");
        setName("");
        setEmail("");
        setContent("");
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to submit comment.");
      }
    } catch (err) {
      setMessage("Failed to submit comment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black rounded-xl p-8 border border-gray-800 mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">Leave a Reply</h2>
      <form className="space-y-4 mb-10" onSubmit={handleSubmit}>
        <div>
          <textarea
            className="w-full rounded bg-neutral-900 border border-gray-700 text-white px-3 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 text-lg"
            placeholder="Comment*"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={5}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded bg-neutral-900 border border-gray-700 text-white focus:outline-none"
            placeholder="Name*"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="flex-1 px-4 py-3 rounded bg-neutral-900 border border-gray-700 text-white focus:outline-none"
            placeholder="Email*"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
        {message && <p className="mt-2 text-sm text-gray-300">{message}</p>}
      </form>
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-gray-400 italic">No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-6">
            {comments.map((c: any) => (
              <li key={c.id} className="bg-neutral-900 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">{c.author_name}</span>
                  <span className="text-gray-500 text-xs">{new Date(c.date).toISOString().slice(0, 10)}</span>
                </div>
                <div className="text-gray-200" dangerouslySetInnerHTML={{ __html: c.content.rendered }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 