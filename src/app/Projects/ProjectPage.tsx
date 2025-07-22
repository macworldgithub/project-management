"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaBell, FaReact, FaTimes, FaUserAlt } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import AddProject from "./AddProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Define types for project and team member
interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  availability: number;
}

interface Project {
  _id?: string;
  name: string;
  deliveryDate?: string;
  team?: TeamMember[];
  complexity?: string;
  status?: string;
  projectId?: string;
}
type Timeline = {
  tasks: {
    taskId: string;
    name: string;
    startDate: string;
    endDate: string;
    assignee: string;
    role: string;
    status: string;
    priority: string;
  }[];
  milestones: {
    _id: string;
    name: string;
    date: string;
  }[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [projectTimelines, setProjectTimelines] = useState<
    Record<string, Timeline>
  >({});
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;
  const router = useRouter();

  // Modal and detail state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [projectDetail, setProjectDetail] = useState<
    Project | { error: string } | null
  >(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [openTimelineId, setOpenTimelineId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get<Project[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`
        );
        setProjects(res.data);
      } catch (err) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const fetchProjectTimeline = async (projectId: string) => {
    if (openTimelineId === projectId) {
      // If already open, close it
      setOpenTimelineId(null);
      return;
    }

    try {
      setLoadingProjectId(projectId);
      const response = await axios.get<Timeline>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${projectId}/timeline`
      );
      setProjectTimelines((prev) => ({
        ...prev,
        [projectId]: response.data,
      }));
      setOpenTimelineId(projectId); // open this project's timeline
    } catch (error) {
      console.error(error);
      alert("Error loading timeline");
    } finally {
      setLoadingProjectId(null);
    }
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIdx = (currentPage - 1) * projectsPerPage;
  const endIdx = startIdx + projectsPerPage;
  const currentProjects = projects.slice(startIdx, endIdx);
  console.log("Current Projects:", currentProjects);

  // Card click handler: open modal and fetch detail
  const handleProjectClick = async (projectId: string | undefined) => {
    if (!projectId) return;
    setSelectedProjectId(projectId);
    setModalOpen(true);
    setDetailLoading(true);
    try {
      const res = await axios.get<Project>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${projectId}`
      );
      setProjectDetail(res.data);
    } catch (err) {
      setProjectDetail({ error: "Failed to load project details" });
    } finally {
      setDetailLoading(false);
    }
  };

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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((proj: any, index: number) => (
                <div
                  key={proj._id || index}
                  className="rounded-xl shadow-sm p-5 hover:shadow-lg transition"
                  title="View project details"
                  onClick={() => handleProjectClick(proj.projectId)}
                >
                  {/* Existing card content */}
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
                  <p className="text-sm text-gray-600 mb-4">
                    {proj.complexity}
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div
                      className={`h-full rounded-full bg-blue-600`}
                      style={{ width: `50%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Progress: 50%
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>
                      Due:{" "}
                      {proj.deliveryDate
                        ? new Date(proj.deliveryDate).toLocaleDateString()
                        : ""}
                    </span>
                    <div className="flex space-x-1">
                      {Array.from({ length: proj.team?.length || 0 }).map(
                        (_, i) => (
                          <FaUserAlt
                            key={i}
                            className="text-gray-400 text-xs"
                          />
                        )
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents modal from opening
                      fetchProjectTimeline(proj.projectId);
                    }}
                    // onClick={() => fetchProjectTimeline(proj.projectId)}
                    className="mt-2 bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition text-sm"
                  >
                    {openTimelineId === proj.projectId
                      ? "Close Timeline"
                      : "View Timeline"}
                  </button>

                  {/* Timeline block inside the map */}
                  {openTimelineId === proj.projectId &&
                    projectTimelines[proj.projectId] && (
                      <div className="mt-4 bg-gray-100 rounded-lg p-3 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700">
                            Tasks
                          </h4>
                          {projectTimelines[proj.projectId].tasks.map(
                            (task) => (
                              <div
                                key={task.taskId}
                                className="p-2 mb-2 rounded border bg-white text-sm text-gray-800"
                              >
                                <div className="font-medium">{task.name}</div>
                                <div className="text-xs text-gray-500">
                                  {new Date(
                                    task.startDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(task.endDate).toLocaleDateString()}
                                </div>
                                <div className="text-xs">
                                  Assignee: {task.assignee}
                                </div>
                                <div className="text-xs">Role: {task.role}</div>
                                <div className="text-xs">
                                  Status: {task.status}
                                </div>
                                <div className="text-xs">
                                  Priority: {task.priority}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-gray-700">
                            Milestones
                          </h4>
                          {projectTimelines[proj.projectId]?.milestones ? (
                            projectTimelines[proj.projectId].milestones.map(
                              (milestone: any) => (
                                <div
                                  key={milestone._id}
                                  className="p-2 mb-1 rounded border bg-white text-sm text-gray-800"
                                >
                                  <div>{milestone.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(
                                      milestone.date
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <div className="text-gray-500 text-sm">
                              Loading timeline...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
            {/* Footer Pagination */}
            <div className="flex justify-between items-center mt-6 text-xs text-gray-600">
              <div>
                Showing {projects.length === 0 ? 0 : startIdx + 1}-
                {Math.min(endIdx, projects.length)} of {projects.length}{" "}
                projects
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            </div>
          </>
        )}
        {/* Modal for project detail */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => {
                  setModalOpen(false);
                  setProjectDetail(null);
                  setSelectedProjectId(null);
                }}
              >
                {/* <FaTimes className="text-lg" color="red" /> */}
                <h1 className="text-red-600">Close</h1>
              </button>

              {detailLoading ? (
                <div className="text-center py-10">Loading...</div>
              ) : projectDetail && !("error" in projectDetail) ? (
                <>
                  <h2 className="text-xl font-bold mb-2">
                    {projectDetail.name}
                  </h2>
                  <div className="mb-2 text-gray-600">
                    Status: {projectDetail.status}
                  </div>
                  <div className="mb-2 text-gray-600">
                    Complexity: {projectDetail.complexity}
                  </div>
                  <div className="mb-2 text-gray-600">
                    Delivery Date:{" "}
                    {projectDetail.deliveryDate
                      ? new Date(
                          projectDetail.deliveryDate
                        ).toLocaleDateString()
                      : ""}
                  </div>
                  <div className="mb-2 text-gray-600">
                    Team:
                    <ul className="list-disc ml-6">
                      {projectDetail.team?.map((member, idx) => (
                        <li key={member._id || idx}>
                          {member.name} ({member.role}) - Availability:{" "}
                          {member.availability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-red-500">
                  {(projectDetail as { error?: string })?.error ||
                    "No details found."}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
