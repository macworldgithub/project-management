'use client';

import React from 'react';
import { FaSlack, FaUser, FaProjectDiagram } from 'react-icons/fa';
import { BsFileEarmarkSpreadsheet, BsTrello, BsLock } from 'react-icons/bs';

const PlanPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-10 bg-gray-200">
      {/* Plan Customization Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Plan Customization</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline Adjustments */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Timeline Adjustments</h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Project Duration</label>
              <input type="range" min="1" max="12" defaultValue="3.5" step="0.1" className="w-full" />
              <p className="text-sm text-gray-500 mt-1">3.5 months</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Task Parallelization</label>
              <input type="range" min="0" max="2" defaultValue="1" className="w-full" />
              <p className="text-sm text-gray-500 mt-1">Medium</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Buffer Time</label>
              <input type="range" min="0" max="20" defaultValue="10" className="w-full" />
              <p className="text-sm text-gray-500 mt-1">10%</p>
            </div>
          </div>

          {/* Resource Allocation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Resource Allocation</h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Team Utilization</label>
              <input type="range" min="0" max="100" defaultValue="85" className="w-full" />
              <p className="text-sm text-gray-500 mt-1">85%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cost Optimization</label>
              <input type="range" min="0" max="2" defaultValue="1" className="w-full" />
              <p className="text-sm text-gray-500 mt-1">Medium</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Risk Tolerance</label>
              <input type="range" min="0" max="2" defaultValue="1" className="w-full" />
              <p className="text-sm text-gray-500 mt-1">Medium</p>
            </div>
          </div>
        </div>

        {/* Implementation Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <button className="flex flex-col items-start gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium">
            <div className="flex items-center gap-2">
              <BsFileEarmarkSpreadsheet className="text-xl" /> Export to Excel
            </div>
            <p className="text-xs text-gray-600">Download as Excel spreadsheet with tasks and timeline</p>
          </button>

          <button className="flex flex-col items-start gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium">
            <div className="flex items-center gap-2">
              <FaProjectDiagram className="text-xl" /> MS Project
            </div>
            <p className="text-xs text-gray-600">Export plan to Microsoft Project format</p>
          </button>

          <button className="flex flex-col items-start gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium">
            <div className="flex items-center gap-2">
              <BsTrello className="text-xl" /> Trello
            </div>
            <p className="text-xs text-gray-600">Create boards and cards in Trello</p>
          </button>

          <button className="flex flex-col items-start gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium">
            <div className="flex items-center gap-2">
              <FaSlack className="text-xl" /> Share with Team
            </div>
            <p className="text-xs text-gray-600">Send plan to team members via Slack</p>
          </button>
        </div>
      </div>

      {/* AI Planning Assistant Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="text-lg md:text-xl font-semibold text-gray-800">
          <BsLock className="inline-block mr-2 text-blue-500" />
          AI Planning Assistant
        </div>
        <p className="text-sm text-gray-600">Ask questions or get recommendations about your project plan</p>

        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="flex items-start gap-2">
              <BsLock className="text-blue-500 mt-1" />
              <p className="text-sm text-gray-700">
                Based on your project requirements, I recommend the <strong>"Optimized Timeline"</strong> plan. It balances efficiency with reasonable risk levels. Would you like me to explain the key benefits?
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-100 text-blue-900 p-4 rounded-xl max-w-md">
              <div className="flex items-center gap-2 justify-end">
                <p className="text-sm">Can you suggest ways to reduce the project duration without significantly increasing risk?</p>
                <FaUser className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="flex items-start gap-2">
              <BsLock className="text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-700 mb-2">To reduce project duration while managing risk, you could:</p>
                <ul className="list-decimal text-sm text-gray-700 pl-5 space-y-1">
                  <li>Increase task parallelization for non-dependent activities</li>
                  <li>Add 2 more team members to critical path tasks</li>
                  <li>Reduce the scope of lower-priority features</li>
                  <li>Consider a phased delivery approach</li>
                </ul>
                <p className="text-sm text-gray-700 mt-2">
                  I've updated the plan customization options to reflect these changes. Would you like to see the impact?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mt-4">
          <input
            type="text"
            placeholder="Ask a question about your project plan..."
            className="flex-1 px-2 py-1 text-sm outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;