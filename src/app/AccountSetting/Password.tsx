// app/account/page.tsx
"use client";

import { useState } from 'react';

export default function Password() {

  const [activeTab] = useState('security');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password update logic here
    console.log('Password update attempted');
  };

  const loginHistory = [
    {
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      ip: '192.168.114',
      time: 'Just now',
      status: 'Current',
      browser: 'Chrome 115'
    },
    {
      device: 'iPhone 13',
      location: 'San Francisco, CA',
      ip: '192.168.0.232',
      time: 'Yesterday, 3:24 PM',
      status: 'Normal',
      browser: 'Safari 16'
    },
    {
      device: 'Windows PC',
      location: 'New York, NY',
      ip: '45.23.156.78',
      time: 'Jun 20, 2025, 9:30 AM',
      status: 'Unusual',
      browser: 'Firefox 112'
    }
  ];

  return (
    <div className=" bg-gray-200 p-4 md:p-8 max-sm:-mt-8 max-md:-mt-10 md:-mt-14">
      <div className="max-w-6xl mx-auto">

        {/* Security Content */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Password Update */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Password</h2>
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h2>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-600 mb-2">Add an extra layer of security to your account</p>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${twoFactorEnabled ? 'bg-green-100 text-green-800 focus:ring-green-500' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}`}
                  >
                    {twoFactorEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
                  </button>
                </div>
                {twoFactorEnabled && (
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <p className="text-green-700 text-sm">Two-factor authentication is currently enabled for your account.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Login History */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Login History</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEVICE</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LOCATION</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP ADDRESS</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TIME</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loginHistory.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{entry.device}</div>
                          <div className="text-sm text-gray-500">{entry.browser}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.ip}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            entry.status === 'Current' ? 'bg-blue-100 text-blue-800' :
                            entry.status === 'Unusual' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}