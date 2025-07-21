"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import AddProject from "./AddProject";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        // Optionally show error
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-black">
          <h1 className="text-2xl font-bold">Projects</h1>
          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
            June 19, 2025
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <FaBell className="text-gray-600 text-lg" />
          <div className="flex items-center space-x-2">
            <FaUserAlt className="text-gray-600 text-sm" />
            <span className="text-sm text-gray-700 font-medium">
              Michael Anderson
            </span>
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
          {/* <button className="px-2 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700">
            + Add New Project
          </button> */}

          {/* Replace original button with AddProject */}
          <AddProject />
        </div>
      </div>

      {/* Cards */}
      <div className="bg-gray-100 px-6 py-6 ">
        {loading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, index) => (
              <div key={proj._id || index} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-black">
                    {proj.name}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      proj.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : proj.status === "On Hold"
                        ? "bg-yellow-100 text-yellow-800"
                        : proj.status === "Delayed"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{proj.complexity}</p>
                {/* Progress bar can be static or calculated if you have progress info */}
                <div className="h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className={`h-full rounded-full bg-blue-600`}
                    style={{ width: `50%` }} // You can replace 50 with actual progress if available
                  />
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {/* If you have progress, show it here */}
                  Progress: 50%
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    Due: {proj.deliveryDate ? new Date(proj.deliveryDate).toLocaleDateString() : ""}
                  </span>
                  <div className="flex space-x-1">
                    {Array.from({ length: proj.team?.length || 0 }).map((_, i) => (
                      <FaUserAlt key={i} className="text-gray-400 text-xs" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Pagination */}
        <div className="flex  justify-between items-center mt-6 text-xs text-gray-600">
          <div>Showing 1-9 of 12 projects</div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200">
              {"<"}
            </button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">
              2
            </button>
            <button className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200">
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
