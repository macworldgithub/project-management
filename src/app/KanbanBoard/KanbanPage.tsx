'use client';

import Image from 'next/image';
import { FaBell, FaFilter } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

type Task = {
  title: string;
  desc: string;
  assignee: string;
  date: string;
  level: 'Low' | 'Medium' | 'High' | 'Completed';
  tags: string[];
};

type Column = {
  title: string;
  tasks: Task[];
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Low':
      return 'bg-green-100 text-green-700';
    case 'Medium':
      return 'bg-orange-100 text-orange-700';
    case 'High':
      return 'bg-red-100 text-red-700';
    case 'Completed':
      return 'bg-gray-200 text-gray-600';
    default:
      return '';
  }
};

const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'api':
      return 'bg-blue-100 text-blue-700';
    case 'design':
      return 'bg-purple-100 text-purple-700';
    case 'docs':
      return 'bg-indigo-100 text-indigo-700';
    case 'bug':
      return 'bg-red-100 text-red-700';
    case 'payment':
      return 'bg-pink-100 text-pink-700';
    case 'feature':
      return 'bg-yellow-100 text-yellow-800';
    case 'user':
      return 'bg-teal-100 text-teal-700';
    case 'performance':
      return 'bg-green-100 text-green-700';
    case 'e-commerce':
      return 'bg-orange-100 text-orange-700';
    case 'devops':
      return 'bg-gray-200 text-gray-600';
    case 'mobile':
      return 'bg-cyan-100 text-cyan-700';
    case 'database':
      return 'bg-amber-100 text-amber-800';
    case 'ai':
      return 'bg-fuchsia-100 text-fuchsia-700';
    case 'security':
      return 'bg-rose-100 text-rose-700';
    case 'auth':
      return 'bg-violet-100 text-violet-700';
    case 'ux/ui':
      return 'bg-lime-100 text-lime-700';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

const board: Column[] = [
  {
    title: 'To Do',
    tasks: [
      {
        title: 'Design API Integration Architecture',
        desc: 'Create a detailed architecture diagram for the third-party API integration.',
        assignee: 'James Wilson',
        date: 'Jun 24',
        level: 'Medium',
        tags: ['API', 'Design'],
      },
      {
        title: 'Fix Payment Gateway Issues',
        desc: 'Investigate and resolve the payment processing errors reported by customers.',
        assignee: 'Emily Davis',
        date: 'Jun 22',
        level: 'High',
        tags: ['Bug', 'Payment'],
      },
      {
        title: 'Update User Documentation',
        desc: 'Review and update the user guide with the latest features and improvements.',
        assignee: 'Sarah Johnson',
        date: 'Jun 25',
        level: 'Low',
        tags: ['Docs'],
      },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      {
        title: 'Implement Shopping Cart Functionality',
        desc: 'Develop the shopping cart module with item management and checkout flow.',
        assignee: 'James Wilson',
        date: 'Jun 25',
        level: 'High',
        tags: ['Feature', 'E-commerce'],
      },
      {
        title: 'Optimize Database Queries',
        desc: 'Improve performance by optimizing slow database queries.',
        assignee: 'Michael Anderson',
        date: 'Jun 24',
        level: 'Medium',
        tags: ['Performance', 'Database'],
      },
    ],
  },
  {
    title: 'Review',
    tasks: [
      {
        title: 'Implement Product Recommendation Engine',
        desc: 'Create an algorithm to suggest relevant products based on user history.',
        assignee: 'James Wilson',
        date: 'Jun 22',
        level: 'Medium',
        tags: ['AI', 'E-commerce'],
      },
      {
        title: 'Mobile App Navigation Redesign',
        desc: 'Improve the mobile app navigation structure based on feedback.',
        assignee: 'Rebecca Lewis',
        date: 'Jun 21',
        level: 'High',
        tags: ['Design', 'Mobile'],
      },
    ],
  },
  {
    title: 'Done',
    tasks: [
      {
        title: 'Set Up CI/CD Pipeline',
        desc: 'Configure automated testing and deployment pipeline.',
        assignee: 'Michael Anderson',
        date: 'Jun 18',
        level: 'Completed',
        tags: ['DevOps'],
      },
      {
        title: 'User Profile Management',
        desc: 'Implement user profile editing, preferences, and account features.',
        assignee: 'Emily Davis',
        date: 'Jun 17',
        level: 'Completed',
        tags: ['Feature', 'User'],
      },
    ],
  },
];

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-gray-200 text-black">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-semibold">Kanban Board</h1>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-600 text-lg" />
          <Image src="/avatar.png" alt="avatar" width={32} height={32} className="rounded-full" />
          <span className="text-sm text-gray-700 font-medium">Michael Anderson</span>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white flex flex-col lg:flex-row justify-between px-6 py-4 gap-4 border-b">
        <div />
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center px-3 py-1.5 border rounded-md bg-white text-sm hover:bg-gray-100">
            <FaFilter className="mr-2" />
            Filter
          </button>
          <div className="relative">
            <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-8 pr-3 py-1.5 border rounded-md text-sm"
            />
          </div>
          <button className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700">
            <AiOutlinePlus className="mr-1" />
            Add New Task
          </button>
        </div>
      </div>

      {/* Board Columns */}
      <div className="px-4 py-6 overflow-x-auto">
        <div className="flex gap-4 w-[200%] sm:w-[140%] lg:w-full">
          {board.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 min-w-[250px]">
              <div className="bg-white rounded-lg shadow p-3">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">{col.title}</h2>
                <div className="space-y-4">
                  {col.tasks.map((task, taskIdx) => (
                    <div
                      key={taskIdx}
                      className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-4 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(task.level)}`}>
                          {task.level}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 text-sm">⋮</button>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-xs text-gray-500">{task.desc}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{task.assignee}</span>
                        <span>{task.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
