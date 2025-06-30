'use client';
import { FaBell, FaUserAlt } from 'react-icons/fa';
import { FiGrid, FiList } from 'react-icons/fi';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Building a comprehensive e-commerce solution with payment integration, inventory management, and analytics dashboard.',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    progress: 75,
    dueDate: 'Jul 15, 2025',
    avatars: 4,
    barColor: 'bg-blue-600',
  },
  {
    title: 'Mobile App Project',
    description: 'Cross-platform mobile application for fitness tracking with social features and personalized workout plans.',
    status: 'On Hold',
    statusColor: 'bg-yellow-100 text-yellow-800',
    progress: 60,
    dueDate: 'Aug 30, 2025',
    avatars: 3,
    barColor: 'bg-orange-500',
  },
  {
    title: 'Dashboard Redesign',
    description: 'Modernizing the analytics dashboard with improved UX/UI, responsive design, and new data visualization components.',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    progress: 90,
    dueDate: 'Jun 28, 2025',
    avatars: 2,
    barColor: 'bg-green-600',
  },
  {
    title: 'CRM Integration',
    description: 'Integrating existing systems with a new CRM platform, including data migration and custom workflow automation.',
    status: 'Delayed',
    statusColor: 'bg-red-100 text-red-700',
    progress: 40,
    dueDate: 'Sep 10, 2025',
    avatars: 3,
    barColor: 'bg-red-600',
  },
  {
    title: 'AI Recommendation Engine',
    description: 'Developing a machine learning-based recommendation system for personalized content delivery across multiple platforms.',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    progress: 65,
    dueDate: 'Oct 5, 2025',
    avatars: 3,
    barColor: 'bg-blue-700',
  },
  {
    title: 'Cloud Migration',
    description: 'Migrating on-premise infrastructure to cloud services with minimal downtime and optimized cost structure.',
    status: 'Planning',
    statusColor: 'bg-blue-100 text-blue-700',
    progress: 15,
    dueDate: 'Nov 20, 2025',
    avatars: 3,
    barColor: 'bg-gray-600',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-black">
          <h1 className="text-2xl font-bold">Projects</h1>
          <span className="text-sm text-gray-500 mt-1 sm:mt-0">June 19, 2025</span>
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-600 text-lg" />
          <div className="flex items-center space-x-2">
            <FaUserAlt className="text-gray-600 text-sm" />
            <span className="text-sm text-gray-700 font-medium">Michael Anderson</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-wrap gap-3 items-center text-black">
          <input
            type="text"
            placeholder="Search projects..."
            className="px-3 py-1.5 border rounded-md text-sm"
          />
          <select className="px-3 py-1.5 border rounded-md text-sm">
            <option>Status</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-sm">
            <option>Team</option>
          </select>
          <select className="px-3 py-1.5 border rounded-md text-sm">
            <option>Date</option>
          </select>
        </div>
        <div className="flex space-x-1">
          <button className="p-2 border rounded-md bg-white hover:bg-gray-200 text-black">
            <FiGrid />
          </button>
          <button className="p-2 border rounded-md bg-white hover:bg-gray-200 text-black">
            <FiList />
          </button>
          <button className="px-2 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700">
            + Add New Project
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="bg-gray-100 px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{proj.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${proj.statusColor}`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{proj.description}</p>
              <div className="h-2 bg-gray-200 rounded-full mb-2">
                <div
                  className={`h-full rounded-full ${proj.barColor}`}
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 mb-2">Progress: {proj.progress}%</div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Due: {proj.dueDate}</span>
                <div className="flex space-x-1">
                  {Array.from({ length: proj.avatars }).map((_, i) => (
                    <FaUserAlt key={i} className="text-gray-400 text-xs" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Pagination */}
        <div className="flex  justify-between items-center mt-6 text-xs text-gray-600">
          <div>Showing 1-9 of 12 projects</div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200">{'<'}</button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">2</button>
            <button className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
