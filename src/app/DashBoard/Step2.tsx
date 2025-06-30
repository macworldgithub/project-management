// app/DashBoard/Step2.tsx
'use client';

import React from 'react';
import { FaCalendarAlt, FaChevronRight } from 'react-icons/fa';

const Step2 = () => {
  return (
    <div className="-mt-6 p-4 sm:p-6 md:p-8 bg-gray-200 space-y-4">
      {/* Top Section - Risk Alerts & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
        {/* Risk Alerts */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Risk Alerts</h2>
            <a href="#" className="text-sm text-blue-600">View All</a>
          </div>
          <div className="space-y-3">
            <div className="bg-red-100 p-3 rounded-md border-l-4 border-red-400">
              <div className="text-sm font-semibold text-red-600">API Integration Delay</div>
              <div className="text-xs text-gray-600">E-commerce Platform - Critical</div>
              <div className="text-right text-xs text-gray-500">2h ago</div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-md border-l-4 border-yellow-400">
              <div className="text-sm font-semibold text-yellow-600">Resource Allocation</div>
              <div className="text-xs text-gray-600">Mobile App Project - Medium</div>
              <div className="text-right text-xs text-gray-500">1d ago</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-md border-l-4 border-blue-400">
              <div className="text-sm font-semibold text-blue-600">Scope Change Request</div>
              <div className="text-xs text-gray-600">Dashboard Redesign - Low</div>
              <div className="text-right text-xs text-gray-500">2d ago</div>
            </div>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-white rounded-lg p-4 shadow ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Milestones</h2>
            <a href="#" className="text-sm text-blue-600 flex items-center gap-1">
              View Calendar <FaCalendarAlt size={14} />
            </a>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">21</span>
              <div>
                <div className="font-medium text-sm">API Integration Complete</div>
                <div className="text-xs text-gray-600">E-commerce Platform</div>
                <div className="text-xs text-gray-400">Robert Chen, Lead Developer</div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">28</span>
              <div>
                <div className="font-medium text-sm">User Testing Phase 1</div>
                <div className="text-xs text-gray-600">Mobile App Project</div>
                <div className="text-xs text-gray-400">Sarah Johnson, UX Researcher</div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">02</span>
              <div>
                <div className="font-medium text-sm">Design System Handoff</div>
                <div className="text-xs text-gray-600">Dashboard Redesign</div>
                <div className="text-xs text-gray-400">Emily Rodriguez, UI Designer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Weekly Overview */}
      <div className="bg-white rounded-lg p-4 shadow text-black">
        <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Completion - Pie Chart Placeholder */}
          <div>
            <h3 className="text-sm font-medium mb-2">Task Completion</h3>
            <div className="h-40 w-40 mx-auto rounded-full border-8 border-blue-600 border-t-green-500 border-r-orange-400 border-b-red-500" />
            <div className="mt-2 text-sm text-center space-y-1">
              <p><span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>Completed</p>
              <p><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>In Progress</p>
              <p><span className="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span>Delayed</p>
              <p><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>Not Started</p>
            </div>
          </div>

          {/* Team Workload - Horizontal Bars */}
          <div>
            <h3 className="text-sm font-medium mb-2">Team Workload</h3>
            <div className="space-y-2">
              {['PM', 'QA', 'Backend', 'Frontend', 'Design'].map((role, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{role}</span>
                  </div>
                  <div className="bg-blue-500 h-2 rounded w-[50%] md:w-[60%] lg:w-[70%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Project Health */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Project Health</h3>
              <div className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer">Previous <FaChevronRight className="rotate-180" /> | Next <FaChevronRight /></div>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="flex justify-between"><span>E-commerce Platform</span><span>75%</span></div>
                <div className="bg-gray-300 h-2 rounded">
                  <div className="bg-blue-600 h-2 rounded w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between"><span>Mobile App Project</span><span>60%</span></div>
                <div className="bg-gray-300 h-2 rounded">
                  <div className="bg-orange-400 h-2 rounded w-[60%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between"><span>Dashboard Redesign</span><span>90%</span></div>
                <div className="bg-gray-300 h-2 rounded">
                  <div className="bg-green-500 h-2 rounded w-[90%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between"><span>CRM Integration</span><span>40%</span></div>
                <div className="bg-gray-300 h-2 rounded">
                  <div className="bg-red-500 h-2 rounded w-[40%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
