'use client';

import React from 'react';
import { FaFileExport, FaCode, FaUsers, FaPaintBrush } from 'react-icons/fa';
// import Image from 'next/image';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 space-y-4">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Performance */}
        <div className="bg-white p-6 rounded-xl shadow text-black">
          <div className="text-lg font-semibold mb-4">Team Performance</div>
          <div className="h-48 mb-4">
            <div className="h-full bg-gradient-to-tr from-green-300 to-blue-300 rounded-full" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><FaPaintBrush className="text-blue-500" /> Design Team - 94.2%</div>
            <div className="flex items-center gap-2"><FaCode className="text-purple-500" /> Development Team - 89.7%</div>
            <div className="flex items-center gap-2"><FaUsers className="text-green-500" /> Marketing Team - 92.3%</div>
          </div>
        </div>

        {/* Time Tracking */}
        <div className="bg-white p-6 rounded-xl shadow text-black">
          <div className="text-lg font-semibold mb-4">Time Tracking</div>
          <div className="h-48 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg mb-4" />
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Development</span>
              <span className="font-medium">42.5 hrs</span>
            </div>
            <div className="w-full h-2 bg-blue-600 rounded-full" />

            <div className="flex justify-between">
              <span>Design</span>
              <span className="font-medium">28.3 hrs</span>
            </div>
            <div className="w-4/6 h-2 bg-blue-400 rounded-full" />

            <div className="flex justify-between">
              <span>Meetings</span>
              <span className="font-medium">15.8 hrs</span>
            </div>
            <div className="w-2/6 h-2 bg-red-400 rounded-full" />
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="bg-white p-6 rounded-xl shadow text-black">
          <div className="text-lg font-semibold mb-4">Resource Allocation</div>
          <div className="h-48 bg-gradient-to-r from-orange-300 via-green-300 to-blue-400 rounded-full mb-4" />
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span className="text-blue-600">Website Redesign</span> <span>35%</span></div>
            <div className="flex justify-between"><span className="text-green-600">Mobile App</span> <span>25%</span></div>
            <div className="flex justify-between"><span className="text-orange-500">Marketing Campaign</span> <span>20%</span></div>
            <div className="flex justify-between"><span className="text-red-500">Product Launch</span> <span>20%</span></div>
          </div>
        </div>
      </div>

      {/* Task Completion Table */}
      <div className="bg-white rounded-xl shadow p-6 text-black">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Task Completion Statistics</h2>
          <button className="bg-gray-100 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 flex items-center gap-2 text-sm font-medium">
            <FaFileExport /> Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-700">
                <th className="p-3">Task Name</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Project</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Homepage Redesign</td>
                <td className="p-3">Sophia Chen <span className="text-xs text-gray-400">UI Designer</span></td>
                <td className="p-3">Website Redesign</td>
                <td className="p-3">Jun 25, 2025</td>
                <td className="p-3 text-green-600 font-medium">Completed</td>
                <td className="p-3"><div className="w-20 h-2 bg-green-500 rounded-full" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-3">API Integration</td>
                <td className="p-3">Michael Johnson <span className="text-xs text-gray-400">Backend Developer</span></td>
                <td className="p-3">Mobile App Development</td>
                <td className="p-3">Jun 30, 2025</td>
                <td className="p-3 text-yellow-600 font-medium">In Progress</td>
                <td className="p-3"><div className="w-16 h-2 bg-yellow-400 rounded-full" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Content Creation</td>
                <td className="p-3">Emily Wilson <span className="text-xs text-gray-400">Content Strategist</span></td>
                <td className="p-3">Marketing Campaign</td>
                <td className="p-3">Jul 05, 2025</td>
                <td className="p-3 text-blue-600 font-medium">In Review</td>
                <td className="p-3"><div className="w-14 h-2 bg-blue-400 rounded-full" /></td>
              </tr>
              <tr className="border-b">
                <td className="p-3">User Testing</td>
                <td className="p-3">David Rodriguez <span className="text-xs text-gray-400">UX Researcher</span></td>
                <td className="p-3">Product Launch</td>
                <td className="p-3">Jul 10, 2025</td>
                <td className="p-3 text-red-600 font-medium">Delayed</td>
                <td className="p-3"><div className="w-10 h-2 bg-red-500 rounded-full" /></td>
              </tr>
              <tr>
                <td className="p-3">Analytics Dashboard</td>
                <td className="p-3">Sarah Thompson <span className="text-xs text-gray-400">Data Analyst</span></td>
                <td className="p-3">Website Redesign</td>
                <td className="p-3">Jul 15, 2025</td>
                <td className="p-3 text-gray-500 font-medium">Not Started</td>
                <td className="p-3"><div className="w-8 h-2 bg-gray-300 rounded-full" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end gap-2 text-sm">
          <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <button className="px-3 py-1 border rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
