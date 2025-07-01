"use client";
// import { useState } from 'react';

export default function Information() {
  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8 max-sm:-mt-8 max-md:-mt-10 md:-mt-14">
      <div className="max-w-6xl mx-auto">
        
        {/* Account Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">Emily</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">Johnson</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center">
              <div className="flex-grow p-2 bg-gray-50 rounded border border-gray-200">emily.johnson@example.com</div>
              <button className="ml-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                Remove photo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="p-2 bg-gray-50 rounded border border-gray-200">+1 (555) 123-4567</div>
          </div>
        </div>

        {/* Language & Region Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Language & Region</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">English (United States)</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">(GMT-07:00) Pacific Time</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">MM/DD/YYYY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
