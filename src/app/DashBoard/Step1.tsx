// app/DashBoard/page.tsx
'use client';

import React from 'react';
import { FaFolder, FaClock, FaTasks, FaExclamationTriangle } from 'react-icons/fa';
import {  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Image from 'next/image';

const data = [
  { week: 'Week 1', actual: 10, planned: 15 },
  { week: 'Week 2', actual: 20, planned: 25 },
  { week: 'Week 3', actual: 35, planned: 40 },
  { week: 'Week 4', actual: 50, planned: 55 },
  { week: 'Week 5', actual: 60, planned: 70 },
  { week: 'Week 6', actual: 75, planned: 85 },
];

const Step1 = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-lg sm:text-xl font-semibold">Dashboard <span className="text-gray-500 font-normal">June 2025</span></h1>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600 text-right">
            <div className="font-semibold">Michael Anderson</div>
            <div className="text-xs text-gray-400">Project Manager</div>
          </div>
          <Image
            src="/avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 text-black">
        {/* Card */}
        <div className="bg-white p-4 rounded-lg shadow ">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Total Projects</span>
            <FaFolder className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold mt-2">12</div>
          <div className="text-green-500 text-xs">↑ +2 Since last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-base">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>On - Time %</span>
            <FaClock className="text-green-400" size={24} />
          </div>
          <div className="text-2xl font-bold mt-2">86%</div>
          <div className="text-green-500 text-xs">↑ +3% from last week</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-base">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Active Tasks</span>
            <FaTasks className="text-blue-400" size={24} />
          </div>
          <div className="text-2xl font-bold mt-2">48</div>
          <div className="text-red-500 text-xs">↓ -5 Since yesterday</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-base">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>AI Alerts</span>
            <FaExclamationTriangle className="text-yellow-400" size={24} />
          </div>
          <div className="text-2xl font-bold mt-2">5</div>
          <div className="text-red-500 text-xs">↑ +2 Requiring Attention</div>
        </div>
  </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Project Timeline Progress</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-full bg-gray-200 text-sm font-medium">Weekly</button>
            <button className="px-3 py-1 rounded-full hover:bg-gray-200 text-sm font-medium">Monthly</button>
            <button className="px-3 py-1 rounded-full hover:bg-gray-200 text-sm font-medium">Quarterly</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" name="Actual Progress" />
            <Area type="monotone" dataKey="planned" stroke="#10b981" fillOpacity={1} fill="url(#colorPlanned)" strokeDasharray="5 5" name="Planned Progress" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Step1;