'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEdit, FiTrash } from 'react-icons/fi';

export default function APIAccess() {
  const [webhooks] = useState([
    {
      url: 'https://example.com/webhook/tasks',
      description: 'Task updates',
    },
    {
      url: 'https://example.com/webhook/projects',
      description: 'Project updates',
    },
  ]);

  const integrations = [
    {
      name: 'Excel',
      description: 'Import and export data with Microsoft Excel',
      icon: '/Excel.png',
    },
    {
      name: 'Trello',
      description: 'Sync tasks and boards with Trello',
      icon: '/trello.png',
    },
    {
      name: 'Twitter',
      description: 'Share updates and monitor mentions',
      icon: '/Twitter.png',
    },
    {
      name: 'YouTube',
      description: 'Embed videos and manage content',
      icon: '/youtube.png',
    },
    {
      name: 'LinkedIn',
      description: 'Share updates and connect with professionals',
      icon: '/linkedin.png',
    },
    {
      name: 'Discord',
      description: 'Collaborate and receive notifications in Discord',
      icon: '/discord.png',
    },
  ];

  return (
    <div className=" bg-gray-200 px-4 md:px-12 py-4">
      {/* API Access Section */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 w-full max-w-6xl mx-auto mb-10 text-black">
        <h3 className="text-xl font-semibold mb-6">API Access</h3>

        {/* API Key */}
        <div className="mb-6">
          <p className="font-medium text-sm mb-1">API Key</p>
          <div className="flex items-center border rounded overflow-hidden">
            <input
              type="text"
              value="sk_live_51Jd82kFjg5tgdKlM92AaB7cD"
              readOnly
              className="flex-1 p-2 text-sm bg-gray-100 outline-none"
            />
            <button className="bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300">Copy</button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Your API key provides full access to your account. Keep it secure!</p>
        </div>

        {/* Webhook URLs */}
        <div>
          <p className="font-medium text-sm mb-2">Webhook URLs</p>
          <div className="space-y-3">
            {webhooks.map((wh, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-100 rounded p-2">
                <div>
                  <p className="text-sm text-gray-800">{wh.url}</p>
                  <p className="text-xs text-gray-500">{wh.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button><FiEdit className="text-gray-500 hover:text-black" /></button>
                  <button><FiTrash className="text-gray-500 hover:text-red-600" /></button>
                </div>
              </div>
            ))}
          </div>
          <button className="text-sm text-violet-600 mt-2 hover:underline">+ Add New</button>
        </div>
      </div>

      {/* Available Integrations */}
      <div className="bg-white rounded-xl shadow p-6 md:p-8 w-full max-w-6xl mx-auto text-black">
        <h3 className="text-xl font-semibold mb-6">Available Integrations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
              </div>
              <p className="text-xs text-gray-500 mb-4">{item.description}</p>
              <button className="border border-gray-400 rounded-md text-sm py-1 font-medium hover:bg-gray-100">
                Connect
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-8">
          <button className="text-sm text-gray-600 hover:text-black">Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
