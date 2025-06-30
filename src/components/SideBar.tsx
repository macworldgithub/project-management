'use client';

import React from 'react';
import Link from 'next/link';
import {
  Squares2X2Icon,
  FolderIcon,
  RectangleStackIcon,
  ChartBarIcon,
  CpuChipIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/DashBoard', icon: <Squares2X2Icon className="h-5 w-5" /> },
  { name: 'Projects', href: '/Projects', icon: <FolderIcon className="h-5 w-5" /> },
  { name: 'Kanban Board', href: '/KanbanBoard', icon: <RectangleStackIcon className="h-5 w-5" /> },
  { name: 'AI Planner', href: '/AIPlanner', icon: <CpuChipIcon className="h-5 w-5" /> },
  { name: 'Reports', href: '/Report', icon: <ChartBarIcon className="h-5 w-5" /> },
  { name: 'Settings', href: '/ProfileSetting', icon: <Cog6ToothIcon className="h-5 w-5" /> },
  { name: 'Account', href: '/AccountSetting', icon: <UserCircleIcon className="h-5 w-5" /> },
];

const SideBar = () => {
  return (
    <aside className="bg-[#0E1422] min-h-screen w-48 p-4 hidden sm:block">
      <div className="text-white text-xl font-bold mb-8">LOGO</div>
      <nav className="space-y-4">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? '#' : item.href}
            className={`flex items-center px-4 py-2 rounded-md text-sm transition ${
              item.disabled
                ? 'bg-[#2b2f3a] text-gray-400 cursor-not-allowed'
                : 'hover:bg-[#1a2233] text-white'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
