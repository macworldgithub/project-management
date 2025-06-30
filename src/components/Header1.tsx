'use client';

import Image from 'next/image';
import { FaBell } from 'react-icons/fa';

export default function Header1() {
  return (
    <header className="w-full bg-white px-4 sm:px-6 py-3 flex items-center justify-end border-b">
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
