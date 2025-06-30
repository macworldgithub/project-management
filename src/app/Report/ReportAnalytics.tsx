'use client';

import React from 'react';
import { FaCheckCircle, FaClipboardList, FaProjectDiagram, FaUsers } from 'react-icons/fa';

const ReportAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 space-y-4">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-black">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div className="text-sm text-gray-500">Total Tasks</div>
          <div className="text-2xl font-bold">248</div>
          <div className="flex items-center justify-between mt-2 text-green-500 text-sm">
            <span>↑ 12.5% vs last month</span>
            <FaClipboardList />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div className="text-sm text-gray-500">Completion Rate</div>
          <div className="text-2xl font-bold">78.3%</div>
          <div className="flex items-center justify-between mt-2 text-green-500 text-sm">
            <span>↑ 4.2% vs last month</span>
            <FaCheckCircle />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div className="text-sm text-gray-500">Active Projects</div>
          <div className="text-2xl font-bold">16</div>
          <div className="flex items-center justify-between mt-2 text-red-500 text-sm">
            <span>↓ 2.0% vs last month</span>
            <FaProjectDiagram />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div className="text-sm text-gray-500">Team Efficiency</div>
          <div className="text-2xl font-bold">92.7%</div>
          <div className="flex items-center justify-between mt-2 text-green-500 text-sm">
            <span>↑ 8.1% vs last month</span>
            <FaUsers />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-lg font-semibold mb-4">Task Completion Rate</div>
          <div className="h-60 w-full">
            {/* Placeholder: Replace with a chart component */}
            <div className="h-full bg-gradient-to-t from-blue-100 to-blue-300 rounded-lg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="text-lg font-semibold mb-4">Project Progress</div>
          <div className="h-60 w-full">
            {/* Placeholder: Replace with a chart component */}
            <div className="h-full bg-gradient-to-t from-green-200 to-green-400 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
