"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaUser,
  FaCrown,
  FaHistory,
  FaHeart,
  FaCog,
  FaEdit,
  FaCamera,
  FaBell,
  FaShieldAlt,
  FaCreditCard,
  FaDownload,
  FaGlobe,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaStar,
  FaPlay,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../login/lib/firebase"; // Ensure this path is correct

// --- Interfaces ---
interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  membership: string;
  joinDate: string;
  watchTime: string;
  favoriteGenres: string[];
  subscription: {
    plan: string;
    status: string;
    nextBilling: string;
    price: string;
  };
}

interface Playlist {
  id: string;
  name: string;
  type: "movie" | "video" | "webseries";
  count: number;
}

// --- Mock Data (used as a template) ---
const mockUserProfile: UserProfile = {
  name: "Guest User",
  email: "guest@blueberriesfilms.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  membership: "Free",
  joinDate: "Just joined",
  watchTime: "0 hours",
  favoriteGenres: [],
  subscription: {
    plan: "No active plan",
    status: "Inactive",
    nextBilling: "N/A",
    price: "Free",
  },
};

const mockPlaylists: Playlist[] = [
  { id: "1", name: "Movies", type: "movie", count: 0 },
  { id: "2", name: "Videos", type: "video", count: 0 },
  { id: "3", name: "WebSeries", type: "webseries", count: 0 },
];

// --- Component ---
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);
        const userProfileData = {
          name: user.displayName || "BlueBerries User",
          email: user.email || user.phoneNumber || "No email provided",
          avatar: user.photoURL || mockUserProfile.avatar,
          joinDate: user.metadata.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : "N/A",
          membership: "Free", // Replace with actual data if available
          watchTime: "0 hours", // Replace with actual data if available
          favoriteGenres: [], // Replace with actual data if available
          subscription: mockUserProfile.subscription, // Replace with actual data if available
        };
        setProfile(userProfileData);
        setEditForm({
          name: userProfileData.name,
          email: userProfileData.email,
        });
      } else {
        // User is signed out, redirect to the login page.
        router.push("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const tabs = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "history", label: "Watch History", icon: FaHistory },
    { id: "playlist", label: "Playlists", icon: FaHeart },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const handleSaveProfile = () => {
    // Here you would typically update the user profile in Firebase
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({ name: profile.name, email: profile.email });
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Here you would upload the image to Firebase Storage and get the URL
        setProfile((prev) => ({ ...prev, avatar: result }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will handle the redirect.
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    document.title = "Profile - BlueBerries Films";
  }, []);

  // Display a loading spinner while checking for user authentication
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black w-full">
      <div className="w-full px-6 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Profile
            </h1>
            <p className="text-gray-300 text-lg">
              Manage your account and preferences
            </p>
          </motion.div>

          {/* Profile Header */}
          <motion.div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar Section */}
              <div className="relative">
                <div
                  className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <FaCamera className="text-white text-xl" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-white">
                    {profile.name}
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors self-center md:self-auto"
                    >
                      <FaEdit className="text-sm" /> Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      disabled
                      className="bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-red-500 cursor-not-allowed"
                      placeholder="Email"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FaCheck /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-300">{profile.email}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                      <span>Member since {profile.joinDate}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id ? "bg-red-600 text-white" : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"}`}
                >
                  <Icon /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Subscription Details */}
                  <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaCrown className="text-red-400" /> Subscription
                    </h3>
                    <div className="space-y-4">
                      {/* Subscription details would go here */}
                    </div>
                    <Link
                      href="/pricing"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl mt-6 flex items-center justify-center"
                    >
                      Get Premium
                    </Link>
                  </div>
                  {/* Quick Stats */}
                  <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaStar className="text-red-400" /> Your Stats
                    </h3>
                    {/* Stats details would go here */}
                  </div>
                </div>
              )}
              {activeTab === "history" && (
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 text-center py-12">
                  <FaHistory className="text-6xl text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No watch history yet</p>
                </div>
              )}
              {activeTab === "playlist" && (
                <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FaHeart className="text-red-400" /> My Playlists
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPlaylists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-red-500 cursor-pointer"
                      >
                        {/* Playlist item details would go here */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  {/* Account Settings, Payment & Billing ... */}
                  {/* Danger Zone */}
                  <div className="bg-zinc-900 rounded-2xl p-8 border border-red-500/20">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaSignOutAlt className="text-red-400" /> Danger Zone
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div>
                        <h4 className="text-white font-semibold">Sign Out</h4>
                        <p className="text-gray-400 text-sm">
                          Sign out of your account on this device
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-28 text-center"
                      >
                        {isSigningOut ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                        ) : (
                          "Sign Out"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
