'use client';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const tabs = [
  { label: 'User Profile', route: '/ProfileSetting' },
  { label: 'Notification Preferences', route: '/NotificationPreference' },
  { label: 'Display Settings', route: '/DisplaySetting' },
  { label: 'Integration Options', route: '/IntegrationOption' },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-gray-200">
      <div className="text-sm text-gray-600 mb-2">
        Dashboard &gt; <span className="text-gray-800 font-medium">Settings</span>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.route}
            onClick={() => router.push(tab.route)}
            className={`pb-2 border-b-2 text-sm font-medium transition ${
              pathname === tab.route
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

        {children}
    </div>
  );
}
