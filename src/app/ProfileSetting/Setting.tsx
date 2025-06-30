'use client';
import React from 'react';
import Image from 'next/image';

const Setting = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 md:px-10 max-sm:-mt-8 max-md:-mt-16 md:-mt-16">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 space-y-10">
        
        {/* Personal Info */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/avatar.png"
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <button className="border px-4 py-1 rounded text-sm text-gray-800 hover:bg-gray-100">
              Change Photo
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                defaultValue="Michael"
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                defaultValue="Anderson"
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="michael.anderson@example.com"
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                defaultValue="Senior Project Manager"
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-1">Time Zone</label>
            <select className="w-full border rounded px-4 py-2 text-sm">
              <option value="">(UTC-08:00) Pacific Time (US & Canada)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select className="w-full border rounded px-4 py-2 text-sm">
              <option value="">English (US)</option>
            </select>
          </div>
        </div>

        {/* Change Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              defaultValue="********"
              className="w-full border rounded px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              defaultValue="********"
              className="w-full border rounded px-4 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              defaultValue="********"
              className="w-full border rounded px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="border border-gray-300 text-sm px-5 py-2 rounded text-gray-800 hover:bg-gray-100">
            Cancel
          </button>
          <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
