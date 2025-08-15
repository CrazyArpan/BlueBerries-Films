"use client";
import React, { useState, useEffect } from "react";
import {
  Film,
  BookOpen,
  Users,
  BarChart2,
  Settings,
  LayoutDashboard,
  MonitorPlay,
  Tv,
  Radio,
  FolderDot,
  PlusCircle,
  X,
  List,
  UserPlus,
  Edit,
  LineChart,
  PieChart,
  AreaChart,
  Info,
  IndianRupee,
  ShieldCheck,
  User,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardSection from "./components/DashboardSection";
import ContentSection from "./components/ContentSection";
import BlogSection from "./components/BlogSection";
import UsersSection from "./components/UsersSection";
import AnalyticsSection from "./components/AnalyticsSection";
import SettingsSection from "./components/SettingsSection";
import ProfileSection from "./components/ProfileSection";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "content", label: "Content Management", icon: Film },
  { id: "blog", label: "Blog Management", icon: BookOpen },
  { id: "users", label: "User Management", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type MenuId = (typeof menuItems)[number]["id"];

const contentTabs = [
  { id: "movies", label: "Movies", icon: Film },
  { id: "tvshows", label: "TV Shows", icon: Tv },
  { id: "livetv", label: "Live TV", icon: Radio },
  { id: "minute4films", label: "45 Minute Films", icon: Film },
  { id: "categories", label: "Categories", icon: FolderDot },
] as const;

type ContentTabId = (typeof contentTabs)[number]["id"];

const contentTabIcons: Record<ContentTabId, React.ElementType> = {
  movies: Film,
  tvshows: Tv,
  livetv: Radio,
  minute4films: Film,
  categories: FolderDot,
};

// 1. Sidebar component
function Sidebar({
  active,
  setActive,
}: {
  active: MenuId;
  setActive: (id: MenuId) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/admin/profile");
  };

  return (
    <aside
      className={`h-screen bg-[#181f2a] shadow-2xl border-r border-[#232b3b] flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"} sticky top-0 z-50`}
    >
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <MonitorPlay className="text-red-500" size={collapsed ? 28 : 32} />
          {!collapsed && (
            <span className="text-2xl font-bold tracking-wide text-white">
              OTT Admin
            </span>
          )}
        </div>
        <button
          className="text-gray-400 hover:text-red-400 focus:outline-none"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <List size={24} /> : <X size={24} />}
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 mx-2 my-1
              ${
                active === item.id
                  ? "bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg scale-105"
                  : "hover:bg-white/10 hover:text-red-400 text-gray-300"
              }
              ${collapsed ? "justify-center px-2" : ""}`}
            onClick={() => setActive(item.id)}
          >
            <item.icon size={20} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="mt-auto mb-6 flex flex-col items-center gap-2">
        <button
          onClick={handleProfileClick}
          className="w-12 h-12 rounded-full border-2 border-red-500 bg-[#232b3b] flex items-center justify-center text-lg font-bold text-white hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
        >
          AD
        </button>
        {!collapsed && (
          <span
            className="text-xs text-gray-400 cursor-pointer hover:text-red-400 transition-colors"
            onClick={handleProfileClick}
          >
            Admin Profile
          </span>
        )}
      </div>
    </aside>
  );
}

// 2. Topbar component
function Topbar() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 shadow-xl border-b border-[#232b3b] bg-[#181f2a]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">Welcome, Admin!</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Placeholder for notifications, settings, dark mode toggle, etc. */}
        <button className="text-gray-400 hover:text-red-400 transition">
          <Settings size={22} />
        </button>
        <button className="text-gray-400 hover:text-yellow-400 transition">
          <Info size={22} />
        </button>
      </div>
    </header>
  );
}

export default function AdminPage() {
  const [active, setActive] = useState<MenuId>("dashboard");
  const [activeTab, setActiveTab] = useState<ContentTabId>("movies");
  const [showModal, setShowModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Content Management State
  const [videos, setVideos] = useState<any[]>([]);
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    releaseYear: "",
    director: "",
    cast: "",
    posterUrl: "",
    videoUrl: "",
    trailerUrl: "",
    rating: "",
    language: "",
    subtitles: "",
    quality: "HD",
    isFeatured: false,
    isPublished: false,
    category: "",
    tags: "",
  });

  // Blog Management State
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    featuredImage: "",
    tags: "",
    category: "",
    status: "draft",
    publishDate: new Date().toISOString().split("T")[0],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);

  // User Management State
  const [users, setUsers] = useState<any[]>([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
    password: "",
  });

  // Settings State
  const [platformName, setPlatformName] = useState("BlueBerries Films");
  const [contactEmail, setContactEmail] = useState(
    "admin@blueberriesfilms.com",
  );
  const [twoFactor, setTwoFactor] = useState(false);
  const [strongPassword, setStrongPassword] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Enhanced Plans with more options
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Red File Special",
      price: 49,
      period: "Lifetime",
      features: ["Access to Red File content", "HD quality", "1 device"],
      description: "Exclusive Red File access",
      popular: false,
      discount: "Limited time",
    },
  ]);

  const [planForm, setPlanForm] = useState({
    name: "",
    price: "",
    period: "",
    features: "",
    description: "",
    popular: false,
    discount: "",
  });

  // Load data on component mount
  useEffect(() => {
    loadVideos();
    loadBlogs();
    loadUsers();
  }, []);

  // API Functions
  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/videos");
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
      setMessage({ type: "error", text: "Failed to load videos" });
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
      setMessage({ type: "error", text: "Failed to load blogs" });
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setMessage({ type: "error", text: "Failed to load users" });
    } finally {
      setLoading(false);
    }
  };

  // Content Management Functions
  function handleAdd() {
    setShowModal(true);
    setVideoForm({
      title: "",
      description: "",
      genre: "",
      duration: "",
      releaseYear: "",
      director: "",
      cast: "",
      posterUrl: "",
      videoUrl: "",
      trailerUrl: "",
      rating: "",
      language: "",
      subtitles: "",
      quality: "HD",
      isFeatured: false,
      isPublished: false,
      category: "",
      tags: "",
    });
  }

  function handleVideoFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;
    setVideoForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleVideoFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...videoForm,
          type: activeTab,
          tags: videoForm.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Video added successfully!" });
        setShowModal(false);
        loadVideos();
      } else {
        setMessage({ type: "error", text: "Failed to add video" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error adding video" });
    } finally {
      setLoading(false);
    }
  }

  // Blog Management Functions
  function handleAddBlog() {
    setShowBlogModal(true);
    setBlogForm({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      featuredImage: "",
      tags: "",
      category: "",
      status: "draft",
      publishDate: new Date().toISOString().split("T")[0],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
  }

  function handleBlogFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlogImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result as string);
        setBlogForm((prev) => ({
          ...prev,
          featuredImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleBlogFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blogForm,
          tags: blogForm.tags.split(",").map((tag) => tag.trim()),
          seoKeywords: blogForm.seoKeywords
            .split(",")
            .map((keyword) => keyword.trim()),
        }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Blog post added successfully!" });
        setShowBlogModal(false);
        loadBlogs();
      } else {
        setMessage({ type: "error", text: "Failed to add blog post" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error adding blog post" });
    } finally {
      setLoading(false);
    }
  }

  // User Management Functions
  function handleAddUser() {
    setShowUserModal(true);
    setUserForm({
      name: "",
      email: "",
      role: "user",
      status: "active",
      password: "",
    });
  }

  function handleUserFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUserFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "User added successfully!" });
        setShowUserModal(false);
        loadUsers();
      } else {
        setMessage({ type: "error", text: "Failed to add user" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error adding user" });
    } finally {
      setLoading(false);
    }
  }

  // Settings Functions
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "success", text: "Settings saved successfully!" });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({
      type: "success",
      text: "Security settings saved successfully!",
    });
  };

  // Plan Management Functions
  function handleEditPlan(plan: any) {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name,
      price: plan.price.toString(),
      period: plan.period,
      features: plan.features.join(", "),
      description: plan.description,
      popular: plan.popular,
      discount: plan.discount || "",
    });
    setShowPlanModal(true);
  }

  function handleDeletePlan(id: number) {
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
    setMessage({ type: "success", text: "Plan deleted successfully!" });
  }

  function handleAddPlan() {
    setEditingPlan(null);
    setPlanForm({
      name: "",
      price: "",
      period: "",
      features: "",
      description: "",
      popular: false,
      discount: "",
    });
    setShowPlanModal(true);
  }

  function handlePlanFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;
    setPlanForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handlePlanFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingPlan) {
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                ...planForm,
                price: Number(planForm.price),
                features: planForm.features.split(",").map((f) => f.trim()),
              }
            : plan,
        ),
      );
    } else {
      setPlans((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...planForm,
          price: Number(planForm.price),
          features: planForm.features.split(",").map((f) => f.trim()),
        },
      ]);
    }
    setShowPlanModal(false);
    setMessage({
      type: "success",
      text: `Plan ${editingPlan ? "updated" : "added"} successfully!`,
    });
  }

  function getList() {
    return videos;
  }

  // Content mapping
  const contentMap = {
    dashboard: <DashboardSection />,
    content: (
      <ContentSection
        contentTabs={contentTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        contentTabIcons={contentTabIcons}
        handleAdd={handleAdd}
        showModal={showModal}
        setShowModal={setShowModal}
        activeTabLabel={
          contentTabs.find((t) => t.id === activeTab)?.label || ""
        }
        videos={videos}
        videoForm={videoForm}
        handleVideoFormChange={handleVideoFormChange}
        handleVideoFormSubmit={handleVideoFormSubmit}
        getList={getList}
        loading={loading}
      />
    ),
    blog: (
      <BlogSection
        blogPosts={blogPosts}
        showBlogModal={showBlogModal}
        setShowBlogModal={setShowBlogModal}
        blogForm={blogForm}
        blogImagePreview={blogImagePreview}
        handleAddBlog={handleAddBlog}
        handleBlogFormChange={handleBlogFormChange}
        handleBlogImageChange={handleBlogImageChange}
        handleBlogFormSubmit={handleBlogFormSubmit}
        loading={loading}
      />
    ),
    users: (
      <UsersSection
        users={users}
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
        userForm={userForm}
        handleAddUser={handleAddUser}
        handleUserFormChange={handleUserFormChange}
        handleUserFormSubmit={handleUserFormSubmit}
        loading={loading}
      />
    ),
    analytics: <AnalyticsSection />,
    settings: (
      <SettingsSection
        platformName={platformName}
        setPlatformName={setPlatformName}
        contactEmail={contactEmail}
        setContactEmail={setContactEmail}
        handleSaveSettings={handleSaveSettings}
        plans={plans}
        handleEditPlan={handleEditPlan}
        handleDeletePlan={handleDeletePlan}
        handleAddPlan={handleAddPlan}
        showPlanModal={showPlanModal}
        setShowPlanModal={setShowPlanModal}
        editingPlan={editingPlan}
        planForm={planForm}
        handlePlanFormChange={handlePlanFormChange}
        handlePlanFormSubmit={handlePlanFormSubmit}
        twoFactor={twoFactor}
        setTwoFactor={setTwoFactor}
        strongPassword={strongPassword}
        setStrongPassword={setStrongPassword}
        sessionTimeout={sessionTimeout}
        setSessionTimeout={setSessionTimeout}
        loginAlerts={loginAlerts}
        setLoginAlerts={setLoginAlerts}
        handleSaveSecurity={handleSaveSecurity}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-[#151a23] flex flex-row">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <Topbar />
        {/* Main Content */}
        <main className="flex-1 p-10 flex items-start justify-center bg-[#151a23]">
          <div className="w-full max-w-5xl">
            {/* Message Display */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-600/20 border border-green-500/30 text-green-300"
                    : "bg-red-600/20 border border-red-500/30 text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}
            {contentMap[active]}
          </div>
        </main>
      </div>
    </div>
  );
}
