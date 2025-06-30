'use client';

import { useState } from 'react';

export default function ProjectRequirements() {
  const [roles, setRoles] = useState([
    { role: 'Project Manager', count: 2 },
    { role: 'Developer', count: 2 },
    { role: 'Designer', count: 1 },
  ]);

  const [newRole, setNewRole] = useState('');

  const removeRole = (roleToRemove: string) => {
    setRoles(roles.filter(r => r.role !== roleToRemove));
  };

  const addRole = () => {
    if (!newRole.trim()) return;
    const existing = roles.find(r => r.role === newRole.trim());
    if (!existing) {
      setRoles([...roles, { role: newRole.trim(), count: 1 }]);
    }
    setNewRole('');
  };

  return (
    <div className="bg-gray-200 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-10">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Project Requirements</h2>
          <p className="text-sm text-gray-500 hidden sm:block">
            ⓘ Define your project parameters for AI planning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input type="text" className="w-full border rounded-md p-2" placeholder="Enter project name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
              <textarea className="w-full border rounded-md p-2" placeholder="Describe your project goals and scope" rows={3} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" className="w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target End Date</label>
                <input type="date" className="w-full border rounded-md p-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                <input type="number" className="w-full border rounded-md p-2" placeholder="Number of team members" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
                <input type="number" className="w-full border rounded-md p-2" placeholder="Project budget" />
              </div>
            </div>
          </div>

          {/* Right Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Objectives</label>
              <div className="space-y-1">
                {['Deliver on time', 'Minimize costs', 'Optimize resource allocation', 'Maximize quality', 'Reduce risks'].map(obj => (
                  <div key={obj} className="flex items-center">
                    <input type="checkbox" id={obj} className="mr-2" />
                    <label htmlFor={obj} className="text-sm text-gray-700">{obj}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <div className="flex items-center space-x-4 text-black">
                {['Low', 'Medium', 'High'].map(level => (
                  <label key={level} className="inline-flex items-center space-x-1 text-sm">
                    <input type="radio" name="priority" className="text-blue-600" />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Constraints</label>
              <textarea className="w-full border rounded-md p-2" placeholder="Describe any specific constraints or requirements" rows={3} />
            </div>
          </div>
        </div>

        {/* Roles Section */}
        <div className="flex flex-wrap gap-2 mt-6 text-black">
          {roles.map((r) => (
            <div key={r.role} className="flex items-center bg-gray-400 rounded-full px-3 py-1 text-sm">
              {r.role}
              <span className="ml-2 bg-gray-300 rounded-full px-2">{r.count}</span>
              <button
                onClick={() => removeRole(r.role)}
                className="ml-2 text-gray-500 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="+ Add Role"
            className="bg-gray-200 rounded-full px-3 py-2 text-sm w-36 outline-none focus:ring"
            onKeyDown={(e) => e.key === 'Enter' && addRole()}
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-xs ">
            Generate AI Plans
          </button>
        </div>
      </div>
    </div>
  );
}
