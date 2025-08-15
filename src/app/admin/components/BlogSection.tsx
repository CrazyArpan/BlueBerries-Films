import React from "react";
import { BookOpen, PlusCircle, List, X } from "lucide-react";

interface BlogPost {
  title: string;
  author: string;
  content: string;
  publishDate: string;
  imageUrl?: string;
}

interface BlogForm {
  title: string;
  author: string;
  content: string;
  publishDate: string;
  imageUrl: string;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
  showBlogModal: boolean;
  setShowBlogModal: (show: boolean) => void;
  blogForm: BlogForm;
  blogImagePreview: string | null;
  handleAddBlog: () => void;
  handleBlogFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlogImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlogFormSubmit: (e: React.FormEvent) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  blogPosts,
  showBlogModal,
  setShowBlogModal,
  blogForm,
  blogImagePreview,
  handleAddBlog,
  handleBlogFormChange,
  handleBlogImageChange,
  handleBlogFormSubmit,
}) => (
  <div className="w-full">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-red-500 flex items-center gap-3">
      <BookOpen size={36} className="-mt-1" /> Blog Management
    </h2>
    <div className="flex items-center justify-between mb-8 mt-8">
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <List size={24} className="text-red-400" /> All Blog Posts
      </div>
      <button
        onClick={handleAddBlog}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
      >
        <PlusCircle size={20} /> Add New Blog Post
      </button>
    </div>
    {/* Modal for Add Blog Post */}
    {showBlogModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#232b3b]/70 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/20 backdrop-blur-lg" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            onClick={() => setShowBlogModal(false)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
            <BookOpen size={24} /> Add New Blog Post
          </h3>
          <form onSubmit={handleBlogFormSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Title</label>
              <input
                name="title"
                value={blogForm.title}
                onChange={handleBlogFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                required
                placeholder="e.g., Latest Trends in Streaming"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Author</label>
              <input
                name="author"
                value={blogForm.author}
                onChange={handleBlogFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                placeholder="e.g., John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Content</label>
              <textarea
                name="content"
                value={blogForm.content}
                onChange={handleBlogFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none min-h-[100px]"
                placeholder="Write your blog post content here..."
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Publish Date</label>
              <input
                name="publishDate"
                value={blogForm.publishDate}
                onChange={handleBlogFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none"
                placeholder="dd/mm/yyyy"
                type="date"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBlogImageChange}
                className="w-full text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
              />
              {blogImagePreview && (
                <img src={blogImagePreview} alt="Preview" className="mt-2 rounded-lg max-h-32 object-contain border border-gray-700" />
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowBlogModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
              >
                Add Blog Post
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    {blogPosts.length === 0 ? (
      <div className="text-center text-gray-400 text-lg mt-24">No blog posts found. Add some!</div>
    ) : (
      <ul className="max-w-xl mx-auto mt-8 space-y-4">
        {blogPosts.map((post, idx) => (
          <li key={idx} className="bg-[#232b3b] rounded-lg px-6 py-3 text-white flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <List size={20} className="text-red-400" />
              <span className="font-semibold">{post.title}</span>
              <span className="text-xs text-gray-400 ml-2">{post.author}</span>
              {post.publishDate && <span className="text-xs text-gray-400 ml-2">{post.publishDate}</span>}
            </div>
            <div className="text-xs text-gray-400 line-clamp-2">{post.content}</div>
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Blog" className="mt-2 rounded-lg max-h-32 object-contain border border-gray-700" />
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default BlogSection; 