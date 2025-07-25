// app/DashBoard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { toast } from "react-toastify";

// Add types for project, timeline, and task
interface Task {
  taskId: string;
  name: string;
  assignee: string;
  dependencies: any[];
  description: string;
  endDate: string;
  priority: string;
  role: string;
  startDate: string;
  status: string;
  _id: string;
}

interface Timeline {
  _id: string;
  projectId: string;
  createdAt: string;
  milestones: any[];
  tasks: Task[];
}

interface Project {
  _id: string;
  name: string;
  deliveryDate: string;
  team: any[];
  complexity: string;
  status: string;
  projectId: string;
  __v: number;
}

const TimelineDashboard = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [timelines, setTimelines] = useState<{ [id: string]: Timeline }>({});
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  // Step 1: Extract active tasks from all projects
  // Count active projects based on task statuses
  const activeProjectCount = allProjects.filter(
    (proj) => proj.status === "Active" || proj.status === "On Hold"
  ).length;

  // Fetch projects and their timelines
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`
      );
      const projects: Project[] = Array.isArray(res.data) ? res.data : [];
      setAllProjects(projects); // ✅ store all projects for counting

      const timelinesObj: { [id: string]: Timeline } = {};
      await Promise.all(
        projects.map(async (proj: Project) => {
          try {
            const timelineRes = await axios.get(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${proj.projectId}/timeline`
            );
            if (
              (timelineRes.data?.tasks && timelineRes.data.tasks.length > 0) ||
              (timelineRes.data?.milestones &&
                timelineRes.data.milestones.length > 0)
            ) {
              timelinesObj[proj.projectId] = timelineRes.data;
            }
          } catch {
            toast.error(`Failed to fetch timeline for project ${proj.name}`);
          }
        })
      );

      setProjects(projects.filter((p: Project) => timelinesObj[p.projectId])); // filtered list
      setTimelines(timelinesObj);
      setSelectedProjectId(Object.keys(timelinesObj)[0] || "");
      setLoading(false);
    };
    fetchData();
  }, []);

  // Prepare chart data for selected project: show % completed per week
  const chartData = React.useMemo(() => {
    if (!selectedProjectId || !timelines[selectedProjectId]) return [];
    const timeline = timelines[selectedProjectId];
    if (!timeline.tasks || timeline.tasks.length === 0) return null; // Use null to indicate no tasks
    // Sort tasks by endDate
    const sortedTasks = [...timeline.tasks].sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
    const total = sortedTasks.length;
    let completedCount = 0;
    const progressPoints: { name: string; completed: number }[] = [];
    const completedStatuses = ["Completed", "Done"];
    sortedTasks.forEach((task, idx) => {
      if (completedStatuses.includes(task.status)) completedCount++;
      const percent = Math.round((completedCount / total) * 100);
      progressPoints.push({
        name: `Task ${idx + 1}`,
        completed: percent,
      });
    });
    return progressPoints;
  }, [selectedProjectId, timelines]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-lg sm:text-xl font-semibold">
          Dashboard <span className="text-gray-500 font-normal">June 2025</span>
        </h1>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600 text-right">
            <div className="font-semibold">Michael Anderson</div>
            <div className="text-xs text-gray-400">Project Manager</div>
          </div>
          {/* Avatar image can be restored if you want */}
          {/* <Image src="/avatar.png" alt="avatar" width={32} height={32} className="rounded-full" /> */}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6 text-black">
        {/* Card */}
        <div className="bg-white p-4 rounded-lg shadow ">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Total Projects</span>
            {/* <FaFolder className="text-blue-400" size={24} /> */}
          </div>
          <div className="text-2xl font-bold mt-2">{allProjects.length}</div>
          {/* <div className="text-green-500 text-xs">↑ +2 Since last month</div> */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-base">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>On - Time %</span>
            {/* <FaClock className="text-green-400" size={24} /> */}
          </div>
          <div className="text-2xl font-bold mt-2">86%</div>
          <div className="text-green-500 text-xs">↑ +3% from last week</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-base">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Active Projects</span>
            {/* <FaTasks className="text-blue-400" size={24} /> */}
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-base">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Active Projects</span>
            </div>
            <div className="text-2xl font-bold mt-2">{activeProjectCount}</div>
          </div>
        </div>

        {/* <div className="bg-white p-4 rounded-lg shadow text-base">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>AI Alerts</span>
          </div>
          <div className="text-2xl font-bold mt-2">5</div>
          <div className="text-red-500 text-xs">↑ +2 Requiring Attention</div>
        </div> */}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Project Timeline Progress</h2>
          <select
            className="px-3 py-1 rounded border"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            {projects.map((proj) => (
              <option key={proj.projectId} value={proj.projectId}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!loading && chartData === null ? (
              <div className="text-center text-gray-500 py-10">
                No tasks available for this project.
              </div>
            ) : !loading &&
              Array.isArray(chartData) &&
              chartData.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No timeline progress data available for this project.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={chartData || []}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorCompleted"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                    name="% Tasks Completed"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#3b82f6" }}
                    activeDot={{ r: 7 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TimelineDashboard;
// app/DashBoard/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { toast } from "react-toastify";

// // Add types for project, timeline, and task
// interface Task {
//   taskId: string;
//   name: string;
//   assignee: string;
//   dependencies: any[];
//   description: string;
//   endDate: string;
//   priority: string;
//   role: string;
//   startDate: string;
//   status: string;
//   _id: string;
// }

// interface Timeline {
//   _id: string;
//   projectId: string;
//   createdAt: string;
//   milestones: any[];
//   tasks: Task[];
// }

// interface Project {
//   _id: string;
//   name: string;
//   deliveryDate: string;
//   team: any[];
//   complexity: string;
//   status: string;
//   projectId: string;
//   __v: number;
// }

// const TimelineDashboard = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [timelines, setTimelines] = useState<{ [id: string]: Timeline }>({});
//   const [selectedProjectId, setSelectedProjectId] = useState<string>("");
//   const [loading, setLoading] = useState(true);

//   // Fetch projects and their timelines
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`
//       );
//       const projects: Project[] = res.data;
//       const timelinesObj: { [id: string]: Timeline } = {};
//       await Promise.all(
//         projects.map(async (proj: Project) => {
//           try {
//             const timelineRes = await axios.get(
//               `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${proj.projectId}/timeline`
//             );
//             if (
//               (timelineRes.data?.tasks && timelineRes.data.tasks.length > 0) ||
//               (timelineRes.data?.milestones &&
//                 timelineRes.data.milestones.length > 0)
//             ) {
//               timelinesObj[proj.projectId] = timelineRes.data;
//             }
//           } catch {
//             toast.error(`Failed to fetch timeline for project ${proj.name}`);
//           }
//         })
//       );
//       setProjects(projects.filter((p: Project) => timelinesObj[p.projectId]));
//       setTimelines(timelinesObj);
//       setSelectedProjectId(Object.keys(timelinesObj)[0] || "");
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   // Prepare chart data for selected project with two series
//   const chartData = React.useMemo(() => {
//     if (!selectedProjectId || !timelines[selectedProjectId]) return [];
//     const timeline = timelines[selectedProjectId];
//     if (!timeline.tasks || timeline.tasks.length === 0) return null;

//     const sortedTasks = [...timeline.tasks].sort(
//       (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
//     );
//     const total = sortedTasks.length;
//     let completedCount = 0;
//     const progressPoints: { name: string; series1: number; series2: number }[] =
//       [];

//     sortedTasks.forEach((task, idx) => {
//       if (["Completed", "Done"].includes(task.status)) completedCount++;
//       const percentCompleted = Math.round((completedCount / total) * 100);
//       const percentInProgress = Math.round(
//         ((idx + 1 - completedCount) / total) * 100
//       ); // Simulated series2 for in-progress tasks
//       progressPoints.push({
//         name: `Task ${idx + 1}`,
//         series1: percentCompleted,
//         series2: percentInProgress,
//       });
//     });
//     return progressPoints;
//   }, [selectedProjectId, timelines]);

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-900 text-white min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-lg sm:text-xl font-semibold">
//           Dashboard <span className="text-gray-400 font-normal">July 2025</span>
//         </h1>
//         <div className="flex items-center space-x-3">
//           <div className="text-sm text-gray-300 text-right">
//             <div className="font-semibold">Michael Anderson</div>
//             <div className="text-xs text-gray-500">Project Manager</div>
//           </div>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//           <div className="flex items-center justify-between text-sm text-gray-400">
//             <span>Total Projects</span>
//           </div>
//           <div className="text-2xl font-bold mt-2 text-white">
//             {projects.length}
//           </div>
//           <div className="text-green-400 text-xs">↑ +2 Since last month</div>
//         </div>
//         <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//           <div className="flex items-center justify-between text-sm text-gray-400">
//             <span>On - Time %</span>
//           </div>
//           <div className="text-2xl font-bold mt-2 text-white">86%</div>
//           <div className="text-green-400 text-xs">↑ +3% from last week</div>
//         </div>
//         <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//           <div className="flex items-center justify-between text-sm text-gray-400">
//             <span>Active Tasks</span>
//           </div>
//           <div className="text-2xl font-bold mt-2 text-white">
//             {timelines[selectedProjectId]?.tasks?.filter(
//               (t) => t.status !== "Completed"
//             ).length ?? 0}
//           </div>
//           <div className="text-red-400 text-xs">↓ -5 Since yesterday</div>
//         </div>
//         <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//           <div className="flex items-center justify-between text-sm text-gray-400">
//             <span>AI Alerts</span>
//           </div>
//           <div className="text-2xl font-bold mt-2 text-white">5</div>
//           <div className="text-red-400 text-xs">↑ +2 Requiring Attention</div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Project Timeline Progress</h2>
//           <select
//             className="px-3 py-1 rounded border border-gray-600 bg-gray-700 text-white"
//             value={selectedProjectId}
//             onChange={(e) => setSelectedProjectId(e.target.value)}
//           >
//             {projects.map((proj) => (
//               <option key={proj.projectId} value={proj.projectId}>
//                 {proj.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {loading ? (
//           <div className="text-center py-10">Loading...</div>
//         ) : (
//           <>
//             {!loading && chartData === null ? (
//               <div className="text-center text-gray-400 py-10">
//                 No tasks available for this project.
//               </div>
//             ) : !loading &&
//               Array.isArray(chartData) &&
//               chartData.length === 0 ? (
//               <div className="text-center text-gray-400 py-10">
//                 No timeline progress data available for this project.
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart
//                   data={chartData || []}
//                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient
//                       id="series1Gradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.8} />
//                       <stop
//                         offset="100%"
//                         stopColor="#00d4ff"
//                         stopOpacity={0.2}
//                       />
//                     </linearGradient>
//                     <linearGradient
//                       id="series2Gradient"
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop offset="0%" stopColor="#ff00ff" stopOpacity={0.7} />
//                       <stop
//                         offset="100%"
//                         stopColor="#ff00ff"
//                         stopOpacity={0.1}
//                       />
//                     </linearGradient>
//                     <filter
//                       id="glow"
//                       x="-50%"
//                       y="-50%"
//                       width="200%"
//                       height="200%"
//                     >
//                       <feGaussianBlur stdDeviation="4" result="coloredBlur" />
//                       <feMerge>
//                         <feMergeNode in="coloredBlur" />
//                         <feMergeNode in="SourceGraphic" />
//                       </feMerge>
//                     </filter>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                   <XAxis dataKey="name" stroke="#bbb" />
//                   <YAxis domain={[0, 100]} stroke="#bbb" />
//                   <Tooltip
//                     contentStyle={{ backgroundColor: "#1a202c", color: "#fff" }}
//                   />
//                   <Legend wrapperStyle={{ color: "#bbb" }} />
//                   <Area
//                     type="monotone"
//                     dataKey="series1"
//                     stroke="#00d4ff"
//                     strokeWidth={2}
//                     fill="url(#series1Gradient)"
//                     fillOpacity={1}
//                     name="Series 1"
//                     filter="url(#glow)"
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="series2"
//                     stroke="#ff00ff"
//                     strokeWidth={2}
//                     fill="url(#series2Gradient)"
//                     fillOpacity={1}
//                     name="Series 2"
//                     filter="url(#glow)"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TimelineDashboard;
