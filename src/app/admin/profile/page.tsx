"use client";
import React, { useState } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, Edit, Shield, Key, Bell, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/api/placeholder/150/150");
  
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@blueberriesfilms.com",
    phone: "+91 98765 43210",
    location: "Kolkata, West Bengal, India",
    role: "Super Admin",
    department: "Platform Management",
    joinDate: "January 2024",
    bio: "Experienced platform administrator with expertise in content management, user administration, and system optimization. Dedicated to maintaining the highest standards of service quality and user experience.",
    skills: ["Content Management", "User Administration", "System Security", "Analytics", "API Management"],
    languages: ["English", "Bengali", "Hindi"],
    timezone: "Asia/Kolkata",
    notifications: {
      email: true,
      push: true,
      sms: false,
      security: true
    }
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#151a23]">
      {/* Header */}
      <div className="bg-[#181f2a] border-b border-[#232b3b] px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Admin
          </button>
          <div className="h-6 w-px bg-gray-600"></div>
          <h1 className="text-2xl font-bold text-white">Admin Profile</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#232b3b] rounded-2xl p-8 shadow-xl">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={profileImage}
                    alt="Admin Profile"
                    className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
                      <Camera size={16} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{formData.name}</h2>
                <p className="text-gray-400 mb-2">{formData.role}</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Shield size={16} />
                  <span className="text-sm font-semibold">Super Admin</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={16} />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={16} />
                  <span className="text-sm">{formData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={16} />
                  <span className="text-sm">{formData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe size={16} />
                  <span className="text-sm">{formData.timezone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(profileData);
                      }}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-[#232b3b] rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User size={24} className="text-blue-400" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Join Date</label>
                  <input
                    type="text"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-300 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50 resize-none"
                />
              </div>
            </div>

            {/* Skills & Languages */}
            <div className="bg-[#232b3b] rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Key size={24} className="text-green-400" />
                Skills & Languages
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Skills</label>
                  <textarea
                    value={formData.skills.join(', ')}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50 resize-none"
                    placeholder="Enter skills separated by commas"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Languages</label>
                  <textarea
                    value={formData.languages.join(', ')}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[#181f2a] border border-[#444a5a] text-white focus:outline-none focus:border-red-400 disabled:opacity-50 resize-none"
                    placeholder="Enter languages separated by commas"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-[#232b3b] rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Bell size={24} className="text-yellow-400" />
                Notification Preferences
              </h3>
              
              <div className="space-y-4">
                {Object.entries(formData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-300 font-medium capitalize">
                        {key === 'push' ? 'Push Notifications' : key === 'sms' ? 'SMS Notifications' : `${key.charAt(0).toUpperCase() + key.slice(1)} Notifications`}
                      </label>
                      <p className="text-gray-400 text-sm">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'push' && 'Receive push notifications in browser'}
                        {key === 'sms' && 'Receive SMS notifications'}
                        {key === 'security' && 'Receive security alerts and updates'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleInputChange(`notifications.${key}`, e.target.checked)}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 