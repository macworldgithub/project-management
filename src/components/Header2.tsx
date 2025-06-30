'use client';

import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';

export default function Header2() {
  return (
    <header className="w-full bg-white px-4 sm:px-6 py-3 flex items-center justify-between border-b">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Icons & User */}
      <div className="flex items-center space-x-4 ml-4">
        <div className="relative">
          <FaBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 h-2 w-2 rounded-full border border-white"></span>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm text-gray-700 font-medium">Emily Johnson</span>
        </div>
      </div>
    </header>
  );
}
