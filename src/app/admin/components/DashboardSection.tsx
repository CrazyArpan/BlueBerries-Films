import React from "react";
import { LayoutDashboard, MonitorPlay, Users, BarChart2 } from "lucide-react";

const DashboardSection = () => (
  <div className="w-full">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-red-500 flex items-center gap-3">
      <LayoutDashboard size={36} className="-mt-1" /> Dashboard Overview
    </h2>
    <div className="text-lg text-gray-200 mb-8">Welcome, Admin!</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Content */}
      <div className="bg-[#232b3b] rounded-xl shadow p-6 flex flex-col justify-between min-h-[160px]">
        <div className="text-lg font-semibold text-white mb-2">Total Content</div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-extrabold text-red-400">--</span>
          <MonitorPlay size={48} className="text-red-400 opacity-80" />
        </div>
        <div className="text-xs text-gray-400 mt-2">(Populated from data)</div>
      </div>
      {/* Active Users */}
      <div className="bg-[#232b3b] rounded-xl shadow p-6 flex flex-col justify-between min-h-[160px]">
        <div className="text-lg font-semibold text-white mb-2">Active Users</div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-extrabold text-green-400">--</span>
          <Users size={48} className="text-green-400 opacity-80" />
        </div>
        <div className="text-xs text-gray-400 mt-2">(Populated from data)</div>
      </div>
      {/* Monthly Revenue */}
      <div className="bg-[#232b3b] rounded-xl shadow p-6 flex flex-col justify-between min-h-[160px]">
        <div className="text-lg font-semibold text-white mb-2">Monthly Revenue</div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-extrabold text-purple-400">--</span>
          <BarChart2 size={48} className="text-purple-400 opacity-80" />
        </div>
        <div className="text-xs text-gray-400 mt-2">(Populated from data)</div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="bg-[#232b3b] rounded-xl shadow p-6 min-h-[160px] flex flex-col">
        <div className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
          <span className="text-blue-400"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M12 3v18" /></svg></span>
          Recent Activity
        </div>
        <div className="text-gray-400 text-base mt-4">Recent activity will appear here dynamically.</div>
      </div>
      {/* Quick Stats */}
      <div className="bg-[#232b3b] rounded-xl shadow p-6 min-h-[160px] flex flex-col">
        <div className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
          <span className="text-orange-400"><BarChart2 size={20} /></span>
          Quick Stats
        </div>
        <div className="text-gray-400 text-base mt-4">Quick statistics will appear here dynamically.</div>
      </div>
    </div>
  </div>
);

export default DashboardSection; 