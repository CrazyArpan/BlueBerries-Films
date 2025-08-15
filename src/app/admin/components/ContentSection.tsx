import React from "react";
import { MonitorPlay, PlusCircle, Film, Tv, Radio, FolderDot, Edit, Trash2, Eye, EyeOff, X } from "lucide-react";

interface ContentTab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface Video {
  id?: number;
  title: string;
  description: string;
  type: string;
  genre: string;
  duration: string;
  releaseYear: string;
  director: string;
  cast: string;
  posterUrl: string;
  videoUrl: string;
  trailerUrl?: string;
  rating?: string;
  language: string;
  quality: string;
  isFeatured: boolean;
  isPublished: boolean;
  category: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ContentSectionProps {
  contentTabs: ContentTab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  contentTabIcons: Record<string, React.ElementType>;
  handleAdd: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  activeTabLabel: string;
  videos: Video[];
  videoForm: any;
  handleVideoFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleVideoFormSubmit: (e: React.FormEvent) => void;
  getList: () => any[];
  loading: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  contentTabs,
  activeTab,
  setActiveTab,
  contentTabIcons,
  handleAdd,
  showModal,
  setShowModal,
  activeTabLabel,
  videos,
  videoForm,
  handleVideoFormChange,
  handleVideoFormSubmit,
  getList,
  loading,
}) => (
  <div className="w-full">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-red-500 flex items-center gap-3">
      <MonitorPlay size={36} className="-mt-1" /> Content Management
    </h2>
    {/* Tabs */}
    <div className="flex items-center gap-2 mt-6 mb-2">
      {contentTabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center gap-2 px-3 py-1 font-semibold text-base focus:outline-none border-b-2 transition-all duration-150
            ${activeTab === tab.id ? "text-red-500 border-red-500" : "text-gray-400 hover:text-red-400 border-transparent"}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <tab.icon size={20} /> {tab.label}
        </button>
      ))}
    </div>
    <hr className="border-[#232b3b] mb-6" />
    {/* Add Form and List */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        {React.createElement(contentTabIcons[activeTab], { size: 24, className: "text-red-400" })}
        All {contentTabs.find((t) => t.id === activeTab)?.label}
      </div>
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg text-base transition"
      >
        <PlusCircle size={20} /> Add New {contentTabs.find((t) => t.id === activeTab)?.label.replace('4m ', '')}
      </button>
    </div>

    {/* Video List */}
    {loading ? (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading content...</p>
      </div>
    ) : videos.length === 0 ? (
      <div className="text-center text-gray-400 text-lg mt-24">
        No {activeTabLabel.toLowerCase()} found. Add some!
      </div>
    ) : (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video.id} className="bg-[#232b3b] rounded-lg p-6 text-white border border-[#2d3748] hover:border-red-500/30 transition-all duration-300">
            {/* Video Poster */}
            <div className="relative mb-4">
              <img
                src={video.posterUrl || '/placeholder-poster.jpg'}
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-poster.jpg';
                }}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {video.isFeatured && (
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">Featured</span>
                )}
                <span className={`text-xs px-2 py-1 rounded ${video.isPublished ? 'bg-green-500' : 'bg-gray-500'}`}>
                  {video.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white truncate">{video.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{video.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{video.releaseYear}</span>
                <span>{video.duration}</span>
                <span>{video.quality}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded">{video.genre}</span>
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{video.language}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#2d3748]">
                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition">
                  <Edit size={16} /> Edit
                </button>
                <button className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm transition">
                  <Eye size={16} /> View
                </button>
                <button className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition ml-auto">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Add Video Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#232b3b]/95 rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-white/20 backdrop-blur-lg">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          
          <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
            <PlusCircle size={24} /> Add New {activeTabLabel}
          </h3>
          
          <form onSubmit={handleVideoFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Title *</label>
                <input
                  name="title"
                  value={videoForm.title}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="Enter video title"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Genre *</label>
                <input
                  name="genre"
                  value={videoForm.genre}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="e.g., Action, Drama, Comedy"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Duration *</label>
                <input
                  name="duration"
                  value={videoForm.duration}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="e.g., 2h 15m"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Release Year *</label>
                <input
                  name="releaseYear"
                  value={videoForm.releaseYear}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="e.g., 2024"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Director</label>
                <input
                  name="director"
                  value={videoForm.director}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  placeholder="Director name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Language *</label>
                <input
                  name="language"
                  value={videoForm.language}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="e.g., Bengali, Hindi, English"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Quality</label>
                <select
                  name="quality"
                  value={videoForm.quality}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                >
                  <option value="SD">SD</option>
                  <option value="HD">HD</option>
                  <option value="4K">4K</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Rating</label>
                <input
                  name="rating"
                  value={videoForm.rating}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  placeholder="e.g., 8.5/10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Cast</label>
              <input
                name="cast"
                value={videoForm.cast}
                onChange={handleVideoFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                placeholder="Cast members (comma separated)"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Description *</label>
              <textarea
                name="description"
                value={videoForm.description}
                onChange={handleVideoFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400 min-h-[100px]"
                required
                placeholder="Enter video description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Poster URL *</label>
                <input
                  name="posterUrl"
                  value={videoForm.posterUrl}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="Poster image URL"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Video URL *</label>
                <input
                  name="videoUrl"
                  value={videoForm.videoUrl}
                  onChange={handleVideoFormChange}
                  className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                  required
                  placeholder="Video file URL"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Trailer URL</label>
              <input
                name="trailerUrl"
                value={videoForm.trailerUrl}
                onChange={handleVideoFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                placeholder="Trailer video URL"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Tags</label>
              <input
                name="tags"
                value={videoForm.tags}
                onChange={handleVideoFormChange}
                className="w-full px-4 py-2 rounded bg-[#181f2a] border border-gray-700 text-white focus:outline-none focus:border-red-400"
                placeholder="Tags (comma separated)"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={videoForm.isFeatured}
                  onChange={handleVideoFormChange}
                  className="rounded border-gray-700 bg-[#181f2a] text-red-500 focus:ring-red-500"
                />
                Featured Video
              </label>
              
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={videoForm.isPublished}
                  onChange={handleVideoFormChange}
                  className="rounded border-gray-700 bg-[#181f2a] text-red-500 focus:ring-red-500"
                />
                Published
              </label>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Video'}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

export default ContentSection; 