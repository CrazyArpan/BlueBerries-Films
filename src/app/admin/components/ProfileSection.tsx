"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Shield, 
  Key, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Edit, 
  X,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  UserCheck,
  Settings,
  Bell,
  Globe,
  Palette,
  Users
} from 'lucide-react';
import Image from 'next/image';

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  location: string;
  joinDate: string;
  lastLogin: string;
  permissions: string[];
}

const mockAdminProfile: AdminProfile = {
  name: "Admin User",
  email: "admin@blueberriesfilms.com",
  role: "Super Administrator",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  joinDate: "January 2024",
  lastLogin: "2 hours ago",
  permissions: ["Content Management", "User Management", "Analytics", "Settings", "Blog Management"]
};

export default function ProfileSection() {
  const [profile, setProfile] = useState(mockAdminProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    emailNotifications: true,
    loginAlerts: true,
    sessionTimeout: 30
  });

  // Set page title
  useEffect(() => {
    document.title = "Admin Profile - BlueBerries Films";
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfile(prev => ({
          ...prev,
          avatar: result
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = () => {
    setProfile(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      location: editForm.location
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      location: profile.location
    });
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    alert('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
            {profile.role}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div 
                        className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 cursor-pointer hover:opacity-80 transition-opacity duration-300 mx-auto"
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
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Camera className="text-white text-xl" />
                        </div>
                      </div>
                      <button 
                        className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-300 disabled:opacity-50"
                        onClick={handleImageClick}
                        disabled={isUploading}
                      >
                        <Camera className="text-sm" />
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    <h2 className="text-2xl font-bold text-white mt-4">{profile.name}</h2>
                    <p className="text-gray-400">{profile.role}</p>
                    <p className="text-gray-500 text-sm mt-1">Member since {profile.joinDate}</p>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="text-red-400" size={16} />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone className="text-red-400" size={16} />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="text-red-400" size={16} />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Profile Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          <Save size={16} />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <p className="text-white">{profile.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <p className="text-white">{profile.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <p className="text-white">{profile.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      ) : (
                        <p className="text-white">{profile.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Permissions</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {profile.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
                          <Check className="text-green-400" size={16} />
                          <span className="text-gray-300 text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Password Change */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Change Password</h3>
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Key size={16} />
                    {showPasswordForm ? 'Cancel' : 'Change Password'}
                  </button>
                </div>

                {showPasswordForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handlePasswordChange}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                    >
                      Update Password
                    </button>
                  </motion.form>
                )}
              </div>

              {/* Security Settings */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="text-red-400" size={20} />
                      <div>
                        <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        securitySettings.twoFactorAuth ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="text-red-400" size={20} />
                      <div>
                        <h4 className="text-white font-medium">Email Notifications</h4>
                        <p className="text-gray-400 text-sm">Receive security alerts via email</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        securitySettings.emailNotifications ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        securitySettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-red-400" size={20} />
                      <div>
                        <h4 className="text-white font-medium">Login Alerts</h4>
                        <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        securitySettings.loginAlerts ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {/* Notification Preferences */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="text-red-400" size={20} />
                      <div>
                        <h4 className="text-white font-medium">System Notifications</h4>
                        <p className="text-gray-400 text-sm">Receive updates about system changes</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-red-500 transition-colors duration-300">
                      <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="text-red-400" size={20} />
                      <div>
                        <h4 className="text-white font-medium">User Activity</h4>
                        <p className="text-gray-400 text-sm">Get notified about user registrations</p>
                      </div>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-red-500 transition-colors duration-300">
                      <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Display Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Theme</label>
                    <select className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Language</label>
                    <select className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 