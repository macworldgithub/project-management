'use client';

import Image from 'next/image';
import { FaBell, FaFilter } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type Task = {
  title: string;
  desc: string;
  assignee: string;
  date: string;
  level: 'To Do' | 'Not Started' | 'In Progress' | 'Delayed' | 'Completed' | 'At Risk' | 'Done' | 'Active';
  tags: string[];
};

type Column = {
  title: string;
  tasks: Task[];
};

type Project = {
  projectId: string;
  name: string;
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
    case 'low':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-orange-100 text-orange-700';
    case 'high':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

export default function KanbanPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [board, setBoard] = useState<Column[]>([
    { title: 'To Do', tasks: [] },
    { title: 'In Progress', tasks: [] },
    { title: 'Done', tasks: [] },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch projects
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        setProjects(response.data);
        if (response.data.length > 0) {
          setSelectedProjectId(response.data[0].projectId);
        }
      } catch (err: any) {
        console.error('Projects API error:', err.message, err.response?.data);
        setError('Failed to fetch projects');
        toast.error('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedProjectId) return;

    // Fetch tasks for selected project
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Task[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks?projectId=${selectedProjectId}`
        );
        console.log('Tasks Response:', response.data); // Debug log
        const tasks = response.data;

        // Group tasks by status
        const newBoard: Column[] = [
          { title: 'To Do', tasks: tasks.filter(task => task.level === 'To Do' || task.level === 'Not Started') },
          { title: 'In Progress', tasks: tasks.filter(task => task.level === 'In Progress' || task.level === 'Active' || task.level === 'Delayed' || task.level === 'At Risk') },
          { title: 'Done', tasks: tasks.filter(task => task.level === 'Completed' || task.level === 'Done') },
        ];
        setBoard(newBoard);
      } catch (err: any) {
        console.error('Tasks API error:', err.message, err.response?.data);
        setError('Failed to fetch tasks');
        toast.error('Failed to fetch tasks');
        setBoard([
          { title: 'To Do', tasks: [] },
          { title: 'In Progress', tasks: [] },
          { title: 'Done', tasks: [] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedProjectId]);

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
        <div className="flex items-center gap-3">
          <select
            value={selectedProjectId || ''}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-1.5 border rounded-md text-sm bg-white"
            disabled={loading || projects.length === 0}
          >
            {projects.length === 0 ? (
              <option value="">No projects available</option>
            ) : (
              projects.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.name}
                </option>
              ))
            )}
          </select>
        </div>
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
        {loading ? (
          <div className="text-center text-gray-600">Loading tasks...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="flex gap-4 w-[150%] sm:w-[120%] lg:w-full">
            {board.map((col, colIdx) => (
              <div key={colIdx} className="flex-1 min-w-[250px]">
                <div className="bg-white rounded-lg shadow p-3">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">{col.title}</h2>
                  <div className="space-y-4">
                    {col.tasks.length === 0 ? (
                      <div className="text-center text-gray-500 text-sm">No tasks</div>
                    ) : (
                      col.tasks.map((task, taskIdx) => (
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
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}