// // app/DashBoard/Step2.tsx
// "use client";

// import React from "react";
// import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";

// const Step2 = () => {
//   return (
//     <div className="-mt-6 p-4 sm:p-6 md:p-8 bg-gray-200 space-y-4">
//       {/* Top Section - Risk Alerts & Milestones */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
//         {/* Risk Alerts */}
//         {/* <div className="bg-white rounded-lg p-4 shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Risk Alerts</h2>
//             <a href="#" className="text-sm text-blue-600">View All</a>
//           </div>
//           <div className="space-y-3">
//             <div className="bg-red-100 p-3 rounded-md border-l-4 border-red-400">
//               <div className="text-sm font-semibold text-red-600">API Integration Delay</div>
//               <div className="text-xs text-gray-600">E-commerce Platform - Critical</div>
//               <div className="text-right text-xs text-gray-500">2h ago</div>
//             </div>
//             <div className="bg-yellow-100 p-3 rounded-md border-l-4 border-yellow-400">
//               <div className="text-sm font-semibold text-yellow-600">Resource Allocation</div>
//               <div className="text-xs text-gray-600">Mobile App Project - Medium</div>
//               <div className="text-right text-xs text-gray-500">1d ago</div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-md border-l-4 border-blue-400">
//               <div className="text-sm font-semibold text-blue-600">Scope Change Request</div>
//               <div className="text-xs text-gray-600">Dashboard Redesign - Low</div>
//               <div className="text-right text-xs text-gray-500">2d ago</div>
//             </div>
//           </div>
//         </div> */}

//         {/* Upcoming Milestones */}
//         {/* <div className="bg-white rounded-lg p-4 shadow ">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Upcoming Milestones</h2>
//             <a
//               href="#"
//               className="text-sm text-blue-600 flex items-center gap-1"
//             >
//               View Calendar <FaCalendarAlt size={14} />
//             </a>
//           </div>
//           <div className="space-y-4">
//             <div className="flex gap-3 items-start">
//               <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
//                 21
//               </span>
//               <div>
//                 <div className="font-medium text-sm">
//                   API Integration Complete
//                 </div>
//                 <div className="text-xs text-gray-600">E-commerce Platform</div>
//                 <div className="text-xs text-gray-400">
//                   Robert Chen, Lead Developer
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-3 items-start">
//               <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
//                 28
//               </span>
//               <div>
//                 <div className="font-medium text-sm">User Testing Phase 1</div>
//                 <div className="text-xs text-gray-600">Mobile App Project</div>
//                 <div className="text-xs text-gray-400">
//                   Sarah Johnson, UX Researcher
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-3 items-start">
//               <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
//                 02
//               </span>
//               <div>
//                 <div className="font-medium text-sm">Design System Handoff</div>
//                 <div className="text-xs text-gray-600">Dashboard Redesign</div>
//                 <div className="text-xs text-gray-400">
//                   Emily Rodriguez, UI Designer
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>

//       {/* Bottom Section - Weekly Overview */}
//       <div className="bg-white rounded-lg p-4 shadow text-black">
//         <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Task Completion - Pie Chart Placeholder */}
//           <div>
//             <h3 className="text-sm font-medium mb-2">Task Completion</h3>
//             <div className="h-40 w-40 mx-auto rounded-full border-8 border-blue-600 border-t-green-500 border-r-orange-400 border-b-red-500" />
//             <div className="mt-2 text-sm text-center space-y-1">
//               <p>
//                 <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
//                 Completed
//               </p>
//               <p>
//                 <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
//                 In Progress
//               </p>
//               <p>
//                 <span className="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
//                 Delayed
//               </p>
//               <p>
//                 <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
//                 Not Started
//               </p>
//             </div>
//           </div>

//           {/* Team Workload - Horizontal Bars */}
//           <div>
//             <h3 className="text-sm font-medium mb-2">Team Workload</h3>
//             <div className="space-y-2">
//               {["PM", "QA", "Backend", "Frontend", "Design"].map(
//                 (role, idx) => (
//                   <div key={idx}>
//                     <div className="flex justify-between text-xs mb-1">
//                       <span>{role}</span>
//                     </div>
//                     <div className="bg-blue-500 h-2 rounded w-[50%] md:w-[60%] lg:w-[70%]" />
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Project Health */}
//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-sm font-medium">Project Health</h3>
//               <div className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer">
//                 Previous <FaChevronRight className="rotate-180" /> | Next{" "}
//                 <FaChevronRight />
//               </div>
//             </div>
//             <div className="space-y-2 text-sm">
//               <div>
//                 <div className="flex justify-between">
//                   <span>E-commerce Platform</span>
//                   <span>75%</span>
//                 </div>
//                 <div className="bg-gray-300 h-2 rounded">
//                   <div className="bg-blue-600 h-2 rounded w-[75%]" />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between">
//                   <span>Mobile App Project</span>
//                   <span>60%</span>
//                 </div>
//                 <div className="bg-gray-300 h-2 rounded">
//                   <div className="bg-orange-400 h-2 rounded w-[60%]" />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between">
//                   <span>Dashboard Redesign</span>
//                   <span>90%</span>
//                 </div>
//                 <div className="bg-gray-300 h-2 rounded">
//                   <div className="bg-green-500 h-2 rounded w-[90%]" />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between">
//                   <span>CRM Integration</span>
//                   <span>40%</span>
//                 </div>
//                 <div className="bg-gray-300 h-2 rounded">
//                   <div className="bg-red-500 h-2 rounded w-[40%]" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2;
"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define interfaces for API data
interface RiskAlert {
  message: string;
  projectName: string;
  priority: string;
  timestamp: string;
}

interface Milestone {
  name: string;
  date: string;
  projectName: string;
  assignee: string;
}

interface TaskCompletion {
  Completed: number;
  "In Progress": number;
  Delayed: number;
  "Not Started": number;
}

interface TeamWorkload {
  PM: number;
  QA: number;
  Backend: number;
  Frontend: number;
  Design: number;
}

interface ProjectHealth {
  name: string;
  health: number;
}

interface ProjectHealthResponse {
  data: ProjectHealth[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface MilestoneResponse {
  data: Milestone[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const Step2 = () => {
  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletion>({
    Completed: 0,
    "In Progress": 0,
    Delayed: 0,
    "Not Started": 0,
  });
  const [teamWorkload, setTeamWorkload] = useState<TeamWorkload>({
    PM: 0,
    QA: 0,
    Backend: 0,
    Frontend: 0,
    Design: 0,
  });
  const [projectHealth, setProjectHealth] = useState<ProjectHealth[]>([]);
  const [projectPagination, setProjectPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }>({ currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 5 });
  const [milestonePagination, setMilestonePagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }>({ currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 5 });
  const [loading, setLoading] = useState<boolean>(true);
  const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setApiErrors({});

      // Fetch Risk Alerts
      try {
        const riskRes = await axios.get<RiskAlert[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/risks`
        );
        setRiskAlerts(riskRes.data);
      } catch (err: any) {
        console.error(
          "Risk Alerts API error:",
          err.message,
          err.response?.data
        );
        setApiErrors((prev) => ({
          ...prev,
          risks: `Failed to fetch risk alerts: ${err.message}`,
        }));
        toast.error(`Failed to fetch risk alerts: ${err.message}`);
      }

      // Fetch Upcoming Milestones
      try {
        const milestoneRes = await axios.get<MilestoneResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/milestones?days=30&page=${milestonePagination.currentPage}&limit=5`
        );
        console.log("Milestones Response:", milestoneRes.data); // Debug log
        // Ensure data is an array
        if (milestoneRes.data && Array.isArray(milestoneRes.data.data)) {
          setMilestones(milestoneRes.data.data);
          setMilestonePagination({
            currentPage: milestoneRes.data.pagination?.currentPage || 1,
            totalPages: milestoneRes.data.pagination?.totalPages || 1,
            totalItems: milestoneRes.data.pagination?.totalItems || 0,
            itemsPerPage: milestoneRes.data.pagination?.itemsPerPage || 5,
          });
        } else {
          console.warn("Milestones data is not an array:", milestoneRes.data);
          setMilestones([]);
          setMilestonePagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: 5,
          });
          setApiErrors((prev) => ({
            ...prev,
            milestones: "Invalid milestones data format",
          }));
          toast.error("Invalid milestones data format");
        }
      } catch (err: any) {
        console.error("Milestones API error:", err.message, err.response?.data);
        setMilestones([]);
        setMilestonePagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 5,
        });
        setApiErrors((prev) => ({
          ...prev,
          milestones: `Failed to fetch milestones: ${err.message}`,
        }));
        toast.error(`Failed to fetch milestones: ${err.message}`);
      }

      // Fetch Task Completion
      try {
        const completionRes = await axios.get<TaskCompletion>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/completion`
        );
        setTaskCompletion(completionRes.data);
      } catch (err: any) {
        console.error(
          "Task Completion API error:",
          err.message,
          err.response?.data
        );
        setApiErrors((prev) => ({
          ...prev,
          taskCompletion: `Failed to fetch task completion: ${err.message}`,
        }));
        toast.error(`Failed to fetch task completion: ${err.message}`);
      }

      // Fetch Team Workload
      try {
        const workloadRes = await axios.get<TeamWorkload>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workload`
        );
        setTeamWorkload(workloadRes.data);
      } catch (err: any) {
        console.error(
          "Team Workload API error:",
          err.message,
          err.response?.data
        );
        setApiErrors((prev) => ({
          ...prev,
          workload: `Failed to fetch workload: ${err.message}`,
        }));
        toast.error(`Failed to fetch workload: ${err.message}`);
      }

      // Fetch Project Health
      try {
        const healthRes = await axios.get<ProjectHealthResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/health?page=${projectPagination.currentPage}&limit=5`
        );
        setProjectHealth(healthRes.data.data);
        setProjectPagination({
          currentPage: healthRes.data.pagination.currentPage,
          totalPages: healthRes.data.pagination.totalPages,
          totalItems: healthRes.data.pagination.totalItems,
          itemsPerPage: healthRes.data.pagination.itemsPerPage,
        });
        console.log("Project Health Response:", healthRes.data); // Debug pagination
      } catch (err: any) {
        console.error(
          "Project Health API error:",
          err.message,
          err.response?.data
        );
        setApiErrors((prev) => ({
          ...prev,
          projectHealth: `Failed to fetch project health: ${err.message}`,
        }));
        toast.error(`Failed to fetch project health: ${err.message}`);
      }

      setLoading(false);
    };
    fetchData();
  }, [projectPagination.currentPage, milestonePagination.currentPage]);

  // Handle project pagination
  const handlePreviousProjectPage = () => {
    if (projectPagination.currentPage > 1) {
      setProjectPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleNextProjectPage = () => {
    if (projectPagination.currentPage < projectPagination.totalPages) {
      setProjectPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  // Handle milestone pagination
  const handlePreviousMilestonePage = () => {
    if (milestonePagination.currentPage > 1) {
      setMilestonePagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleNextMilestonePage = () => {
    if (milestonePagination.currentPage < milestonePagination.totalPages) {
      setMilestonePagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  // Map priority to colors for Risk Alerts
  const getPriorityStyles = (
    priority: string
  ): { bg: string; border: string; text: string } => {
    switch (priority) {
      case "High":
        return {
          bg: "bg-red-100",
          border: "border-red-400",
          text: "text-red-600",
        };
      case "Medium":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-400",
          text: "text-yellow-600",
        };
      case "Low":
        return {
          bg: "bg-blue-100",
          border: "border-blue-400",
          text: "text-blue-600",
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-400",
          text: "text-gray-600",
        };
    }
  };

  // Format date for Milestones
  const formatMilestoneDate = (date: string): string => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "N/A";
      return d.getDate().toString();
    } catch {
      return "N/A";
    }
  };

  // Map health to colors for Project Health
  const getHealthColor = (health: number): string => {
    if (health >= 80) return "bg-green-500";
    if (health >= 60) return "bg-blue-600";
    if (health >= 40) return "bg-orange-400";
    return "bg-red-500";
  };

  // Chart data for Task Completion
  const chartData = {
    labels: ["Completed", "In Progress", "Delayed", "Not Started"],
    datasets: [
      {
        data: [
          taskCompletion.Completed,
          taskCompletion["In Progress"],
          taskCompletion.Delayed,
          taskCompletion["Not Started"],
        ],
        backgroundColor: ["#2563eb", "#22c55e", "#f97316", "#ef4444"],
        borderColor: ["#1e3a8a", "#15803d", "#c2410c", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="-mt-6 p-4 sm:p-6 md:p-8 bg-gray-200 space-y-4">
      {/* Top Section - Risk Alerts & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
        {/* Risk Alerts */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Risk Alerts</h2>
            <a href="#" className="text-sm text-blue-600">
              View All
            </a>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div>Loading...</div>
            ) : apiErrors.risks ? (
              <div className="text-center text-red-500">{apiErrors.risks}</div>
            ) : riskAlerts.length === 0 ? (
              <div className="text-center text-gray-500">
                No risk alerts available
              </div>
            ) : (
              riskAlerts.map((alert, idx) => {
                const styles = getPriorityStyles(alert.priority);
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-md border-l-4 ${styles.bg} ${styles.border}`}
                  >
                    <div className={`text-sm font-semibold ${styles.text}`}>
                      {alert.message}
                    </div>
                    <div className="text-xs text-gray-600">
                      {alert.projectName}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {alert.timestamp
                        ? new Date(alert.timestamp).toLocaleTimeString()
                        : "N/A"}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Milestones</h2>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <button
                onClick={handlePreviousMilestonePage}
                disabled={milestonePagination.currentPage === 1}
                className={`cursor-pointer ${
                  milestonePagination.currentPage === 1 ? "text-gray-300" : ""
                }`}
              >
                Previous <FaChevronRight className="inline rotate-180" />
              </button>
              <span>
                | Page {milestonePagination.currentPage} of{" "}
                {milestonePagination.totalPages} |
              </span>
              <button
                onClick={handleNextMilestonePage}
                disabled={
                  milestonePagination.currentPage ===
                  milestonePagination.totalPages
                }
                className={`cursor-pointer ${
                  milestonePagination.currentPage ===
                  milestonePagination.totalPages
                    ? "text-gray-300"
                    : ""
                }`}
              >
                Next <FaChevronRight className="inline" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div>Loading...</div>
            ) : apiErrors.milestones ? (
              <div className="text-center text-red-500">
                {apiErrors.milestones}
              </div>
            ) : milestones.length === 0 ? (
              <div className="text-center text-gray-500">
                No upcoming milestones
              </div>
            ) : (
              milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {formatMilestoneDate(milestone.date)}
                  </span>
                  <div>
                    <div className="font-medium text-sm">{milestone.name}</div>
                    {/* <div className="text-xs text-gray-600">{milestone.projectName}</div> */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Weekly Overview */}
      <div className="bg-white rounded-lg p-4 shadow text-black">
        <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Completion - Pie Chart */}
          <div>
            <h3 className="text-sm font-medium mb-2">Task Completion</h3>
            {loading ? (
              <div>Loading...</div>
            ) : apiErrors.taskCompletion ? (
              <div className="text-center text-red-500">
                {apiErrors.taskCompletion}
              </div>
            ) : (
              <>
                <div className="h-40 w-40 mx-auto">
                  <Pie
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
                <div className="mt-2 text-sm text-center space-y-1">
                  <p>
                    <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                    Completed
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    In Progress
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                    Delayed
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Not Started
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Team Workload - Horizontal Bars */}
          <div>
            <h3 className="text-sm font-medium mb-2">Team Workload</h3>
            <div className="space-y-2">
              {loading ? (
                <div>Loading...</div>
              ) : apiErrors.workload ? (
                <div className="text-center text-red-500">
                  {apiErrors.workload}
                </div>
              ) : (
                ["PM", "QA", "Backend", "Frontend", "Design"].map(
                  (role, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{role}</span>
                      </div>
                      <div
                        className="bg-blue-500 h-2 rounded"
                        //@ts-ignore
                        style={{ width: `${teamWorkload[role] || 0}%` }}
                      />
                    </div>
                  )
                )
              )}
            </div>
          </div>

          {/* Project Health */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Project Health</h3>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <button
                  onClick={handlePreviousProjectPage}
                  disabled={projectPagination.currentPage === 1}
                  className={`cursor-pointer ${
                    projectPagination.currentPage === 1 ? "text-gray-300" : ""
                  }`}
                >
                  Previous <FaChevronRight className="inline rotate-180" />
                </button>
                <span>
                  | Page {projectPagination.currentPage} of{" "}
                  {projectPagination.totalPages} |
                </span>
                <button
                  onClick={handleNextProjectPage}
                  disabled={
                    projectPagination.currentPage ===
                    projectPagination.totalPages
                  }
                  className={`cursor-pointer ${
                    projectPagination.currentPage ===
                    projectPagination.totalPages
                      ? "text-gray-300"
                      : ""
                  }`}
                >
                  Next <FaChevronRight className="inline" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {loading ? (
                <div>Loading...</div>
              ) : apiErrors.projectHealth ? (
                <div className="text-center text-red-500">
                  {apiErrors.projectHealth}
                </div>
              ) : projectHealth.length === 0 ? (
                <div className="text-center text-gray-500">
                  No project health data
                </div>
              ) : (
                projectHealth.map((project, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between">
                      <span>{project.name}</span>
                      <span>{project.health}%</span>
                    </div>
                    <div className="bg-gray-300 h-2 rounded">
                      <div
                        className={`h-2 rounded ${getHealthColor(
                          project.health
                        )}`}
                        style={{ width: `${project.health}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
