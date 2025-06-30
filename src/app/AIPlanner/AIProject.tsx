'use client';

import { useState } from 'react';

export default function AIProject() {
  const [fileName, setFileName] = useState('');
  const [scopeText, setScopeText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className=" bg-gray-200 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">AI Project Planner</h1>
        <p className="text-gray-600 mb-8">
          Create optimized project plans with AI-powered scheduling, risk analysis, and resource allocation.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Scope</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <label htmlFor="file-upload" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-gray-600">Drag & drop your project scope document here</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOCX, or text files</p>
                </div>
              </label>

              <div className="my-4">or</div>

              <div className="flex justify-center">
                <label htmlFor="file-upload" className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700 transition">
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {fileName && (
                <p className="text-sm text-green-600 mt-2">Selected: {fileName}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-700 mb-2">Or paste scope text directly</p>
            <textarea
              value={scopeText}
              onChange={(e) => setScopeText(e.target.value)}
              className="w-full min-h-[120px] border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Paste your project scope details here..."
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button className="text-sm bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition">
            ← Back to Dashboard
          </button>
          <button className="text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition">
            + Create New Plan
          </button>
        </div>
      </div>
    </div>
  );
}
