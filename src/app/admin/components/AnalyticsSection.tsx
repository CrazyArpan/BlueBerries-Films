import React from "react";
import { BarChart2, LineChart, PieChart, AreaChart } from "lucide-react";

const AnalyticsSection: React.FC = () => (
  <div className="w-full">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-red-500 flex items-center gap-3">
      <BarChart2 size={36} className="-mt-1" /> Analytics & Reports
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Viewership Trends */}
      <div className="bg-[#232b3b] rounded-2xl shadow-lg p-6 flex flex-col min-h-[260px]">
        <div className="flex items-center gap-2 mb-2">
          <LineChart size={24} className="text-blue-400" />
          <span className="text-xl font-bold text-white">Viewership Trends</span>
        </div>
        <p className="text-gray-300 mb-4">Graph showing daily/weekly/monthly viewership. (Placeholder for chart library integration)</p>
        <div className="flex-1 bg-[#2d3546] rounded-xl flex items-center justify-center text-gray-400 text-center min-h-[100px]">
          [Chart Placeholder: Line Chart - Data would be dynamic]
        </div>
      </div>
      {/* Top Content Performance */}
      <div className="bg-[#232b3b] rounded-2xl shadow-lg p-6 flex flex-col min-h-[260px]">
        <div className="flex items-center gap-2 mb-2">
          <BarChart2 size={24} className="text-green-400" />
          <span className="text-xl font-bold text-white">Top Content Performance</span>
        </div>
        <p className="text-gray-300 mb-4">Bar chart showing top 10 movies/shows by views. (Placeholder for chart library integration)</p>
        <div className="flex-1 bg-[#2d3546] rounded-xl flex items-center justify-center text-gray-400 text-center min-h-[100px]">
          [Chart Placeholder: Bar Chart - Data would be dynamic]
        </div>
      </div>
      {/* User Demographics */}
      <div className="bg-[#232b3b] rounded-2xl shadow-lg p-6 flex flex-col min-h-[260px]">
        <div className="flex items-center gap-2 mb-2">
          <PieChart size={24} className="text-purple-400" />
          <span className="text-xl font-bold text-white">User Demographics</span>
        </div>
        <p className="text-gray-300 mb-4">Pie chart showing user distribution by age, gender, location. (Placeholder)</p>
        <div className="flex-1 bg-[#2d3546] rounded-xl flex items-center justify-center text-gray-400 text-center min-h-[100px]">
          [Chart Placeholder: Pie Chart - Data would be dynamic]
        </div>
      </div>
      {/* Subscription Growth */}
      <div className="bg-[#232b3b] rounded-2xl shadow-lg p-6 flex flex-col min-h-[260px]">
        <div className="flex items-center gap-2 mb-2">
          <AreaChart size={24} className="text-orange-400" />
          <span className="text-xl font-bold text-white">Subscription Growth</span>
        </div>
        <p className="text-gray-300 mb-4">Area chart showing new subscriptions over time. (Placeholder)</p>
        <div className="flex-1 bg-[#2d3546] rounded-xl flex items-center justify-center text-gray-400 text-center min-h-[100px]">
          [Chart Placeholder: Area Chart - Data would be dynamic]
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsSection; 