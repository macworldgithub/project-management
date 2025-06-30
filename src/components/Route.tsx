// src/app/settings/layout.tsx
'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { label: 'Security', route: '/AccountSetting' },
  { label: 'Subscription', route: '/Subscription' },
  { label: 'Billing', route: '/Billing' },
  { label: 'Account Management', route: '/AccountManagement' },
];

export default function Route({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className=" bg-gray-200 p-4 md:p-8 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-6">Manage your account security, subscription, and billing information</p>

        <div className="flex flex-wrap gap-2 md:gap-6 mb-8 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.route}
              className={`pb-2 px-1 text-sm md:text-base transition ${
                pathname === tab.route
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => router.push(tab.route)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
