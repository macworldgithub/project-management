'use client';

import Image from 'next/image';
import { FiDownload, FiPrinter, FiGrid } from 'react-icons/fi';
import { BsChevronDown } from 'react-icons/bs';

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-6">
      {/* Top Row */}
      <div className="flex flex-row md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-black">Reports & Analytics</h1>
          <span className="text-gray-500 text-sm">Dashboard</span>
          <span className="text-gray-400 text-sm">›</span>
          <span className="text-sm text-black font-medium">Reports</span>
        </div>

        {/* Right Section */}
        <div className='max-sm:hidden'>
        <Image
            src="/avatar.png"
            alt="User"
            width={36}
            height={36}
            className="rounded-full border"
          />
          </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-black bg-white">
            📅 Last 30 days
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-black bg-white">
            📁 All Projects <BsChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-black bg-white">
            🧑‍🤝‍🧑 All Teams <BsChevronDown size={14} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-black bg-white">
            <FiDownload className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-black bg-white">
            <FiPrinter className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-black bg-white">
            <FiGrid className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
