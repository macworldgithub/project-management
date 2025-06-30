// app/security/page.tsx
"use client";

import { useState } from 'react';

export default function ActiveSession() {
  const [notifications, setNotifications] = useState({
    newSignIn: true,
    suspiciousActivity: true,
    passwordChange: true,
    twoFactorUpdates: true
  });

  const sessions = [
    {
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: 'Just now',
      current: true
    },
    {
      device: 'iPhone 13',
      location: 'San Francisco, CA',
      lastActive: '2 hours ago',
      current: false
    },
    {
      device: 'iPad Pro',
      location: 'San Francisco, CA',
      lastActive: 'Yesterday',
      current: false
    }
  ];

  const handleSignOut = (allDevices: boolean) => {
    // Add sign out logic here
    console.log(allDevices ? 'Signing out all devices' : 'Signing out this device');
  };

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">        
        {/* Active Sessions Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Sessions</h2>
          
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div key={index} className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${session.current ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${session.current ? 'text-gray-900' : 'text-gray-700'}`}>
                      {session.device} {session.current && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2">Current</span>}
                    </h3>
                    {!session.current && (
                      <button className="text-sm text-red-600 hover:text-red-800">
                        Sign Out
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {session.location} • Last active: {session.lastActive}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">New sign-in notifications</h3>
                <p className="text-sm text-gray-500">Get notified when there's a new sign-in to your account</p>
              </div>
              <button
                onClick={() => toggleNotification('newSignIn')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.newSignIn ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications.newSignIn ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Suspicious activity alerts</h3>
                <p className="text-sm text-gray-500">Get notified about suspicious activity on your account</p>
              </div>
              <button
                onClick={() => toggleNotification('suspiciousActivity')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.suspiciousActivity ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications.suspiciousActivity ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Password change confirmations</h3>
                <p className="text-sm text-gray-500">Get notified when your password is changed</p>
              </div>
              <button
                onClick={() => toggleNotification('passwordChange')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.passwordChange ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications.passwordChange ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Two-factor authentication updates</h3>
                <p className="text-sm text-gray-500">Get notified about changes to your two-factor authentication settings</p>
              </div>
              <button
                onClick={() => toggleNotification('twoFactorUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${notifications.twoFactorUpdates ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifications.twoFactorUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}