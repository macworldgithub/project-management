// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import {
//   Squares2X2Icon,
//   FolderIcon,
//   RectangleStackIcon,
//   ChartBarIcon,
//   CpuChipIcon,
//   Cog6ToothIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';

// type NavItem = {
//   name: string;
//   href: string;
//   icon: React.ReactNode;
//   disabled?: boolean;
// };

// const navItems: NavItem[] = [
//   { name: 'Dashboard', href: '/DashBoard', icon: <Squares2X2Icon className="h-5 w-5" /> },
//   { name: 'Projects', href: '/Projects', icon: <FolderIcon className="h-5 w-5" /> },
//   { name: 'Kanban Board', href: '/KanbanBoard', icon: <RectangleStackIcon className="h-5 w-5" /> },
//   { name: 'AI Planner', href: '/AIPlanner', icon: <CpuChipIcon className="h-5 w-5" /> },
//   { name: 'Reports', href: '/Report', icon: <ChartBarIcon className="h-5 w-5" /> },
//   { name: 'Settings', href: '/ProfileSetting', icon: <Cog6ToothIcon className="h-5 w-5" /> },
//   { name: 'Account', href: '/AccountSetting', icon: <UserCircleIcon className="h-5 w-5" /> },
// ];

// const SideBar = () => {
//   return (
//     <aside className="bg-[#0E1422] max-h-screen w-54 p-4 hidden sm:block">
//       <div className="text-white text-xl font-bold mb-8">LOGO</div>
//       <nav className="space-y-4">
//         {navItems.map((item, index) => (
//           <Link
//             key={index}
//             href={item.disabled ? '#' : item.href}
//             className={`flex items-center px-4 py-2 rounded-md text-sm transition ${
//               item.disabled
//                 ? 'bg-[#2b2f3a] text-gray-400 cursor-not-allowed'
//                 : 'hover:bg-[#1a2233] text-white'
//             }`}
//           >
//             {item.icon}
//             <span className="ml-3">{item.name}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default SideBar;
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Squares2X2Icon,
  FolderIcon,
  RectangleStackIcon,
  ChartBarIcon,
  CpuChipIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/DashBoard', icon: <Squares2X2Icon className="h-5 w-5" /> },
  { name: 'Projects', href: '/Projects', icon: <FolderIcon className="h-5 w-5" /> },
  { name: 'Kanban Board', href: '/KanbanBoard', icon: <RectangleStackIcon className="h-5 w-5" /> },
  // { name: 'AI Planner', href: '/AIPlanner', icon: <CpuChipIcon className="h-5 w-5" /> },
  // { name: 'Reports', href: '/Report', icon: <ChartBarIcon className="h-5 w-5" /> },
  // { name: 'Settings', href: '/ProfileSetting', icon: <Cog6ToothIcon className="h-5 w-5" /> },
  // { name: 'Account', href: '/AccountSetting', icon: <UserCircleIcon className="h-5 w-5" /> },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-[#0E1422] p-4 z-50 flex justify-between items-center">
        <div className="text-white text-xl font-bold">LOGO</div>
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-[#0E1422] fixed top-0 left-0 h-screen w-64 p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:w-52 sm:block`}
      >
        <div className="text-white text-xl font-bold mb-8 mt-4 sm:mt-0">LOGO</div>
        <nav className="space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              onClick={() => setIsOpen(false)} // Close sidebar on link click
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

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;