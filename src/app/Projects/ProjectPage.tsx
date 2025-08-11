"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import AddProject from "./AddProject";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ScopeUploader from "./ScopeUploader";
import { IoMdCloseCircleOutline } from "react-icons/io";

// Define types for project, team member, task, and milestone
interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  availability: number;
}

interface Task {
  taskId: string;
  name: string;
  startDate: string;
  endDate: string;
  assignee: string;
  role: string;
  status: string;
  priority: string;
}

interface Milestone {
  _id: string;
  name: string;
  date: string;
}

interface Timeline {
  tasks: Task[];
  milestones: Milestone[];
  progress?: number; // Added to store progress percentage
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [projectsWithTimeline, setProjectsWithTimeline] = useState<{
    [id: string]: boolean;
  }>({});
  const [projectTimelines, setProjectTimelines] = useState<
    Record<string, Timeline>
  >({});
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
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

  // ScopeUploader modal state
  const [scopeUploadProjectId, setScopeUploadProjectId] = useState<
    string | null
  >(null);

  // Edit Timeline modal state
  const [editTimelineModalOpen, setEditTimelineModalOpen] =
    useState<boolean>(false);
  const [editTimelineProjectId, setEditTimelineProjectId] = useState<
    string | null
  >(null);
  const [editTasks, setEditTasks] = useState<Task[]>([]);
  const [editMilestones, setEditMilestones] = useState<Milestone[]>([]);
  const [timelineLoading, setTimelineLoading] = useState<boolean>(false);

  // Edit Team modal state
  const [editTeamModalOpen, setEditTeamModalOpen] = useState<boolean>(false);
  const [editTeamProjectId, setEditTeamProjectId] = useState<string | null>(
    null
  );
  const [editTeamMembers, setEditTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState<boolean>(false);

  // Edit Project modal state
  const [editProjectModalOpen, setEditProjectModalOpen] =
    useState<boolean>(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState<boolean>(false);

  // Fetch projects with search and filter
  // const fetchProjects = async (page: number = 1) => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get<{
  //       data: Project[];
  //       pagination: Pagination;
  //     }>(`https://www.pm.justjdmcars.com.au/api/projects/search`, {
  //       params: {
  //         search: searchQuery,
  //         status: statusFilter,
  //         page,
  //         limit: pagination.itemsPerPage,
  //       },
  //     });
  //     setProjects(Array.isArray(res.data.data) ? res.data.data : []);
  //     setPagination(res.data.pagination);
  //   } catch (err) {
  //     setProjects([]);
  //     toast.error("Failed to fetch projects");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProjects = async (page: number = 1) => {
    setLoading(true);
    try {
      const res = await axios.get<{
        data: Project[];
        pagination: Pagination;
      }>(`https://www.pm.justjdmcars.com.au/api/projects/search`, {
        params: {
          search: searchQuery,
          status: statusFilter,
          page,
          limit: pagination.itemsPerPage,
        },
      });

      const projectsData = Array.isArray(res.data.data) ? res.data.data : [];
      setProjects(projectsData);
      setPagination(res.data.pagination);

      // Filter out projects with undefined projectId
      const validProjects = projectsData.filter(
        (proj) => proj.projectId !== undefined
      );

      // Fetch timeline data for each project and calculate progress
      const timelinePromises = validProjects.map(async (proj) => {
        try {
          const timelineRes = await axios.get<Timeline>(
            `https://www.pm.justjdmcars.com.au/api/projects/${proj.projectId}/timeline`
          );
          const tasks = timelineRes.data.tasks || [];
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(
            (task) => task.status === "Completed"
          ).length;
          const progress =
            totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

          return {
            projectId: proj.projectId!,
            progress,
            timeline: timelineRes.data,
          };
        } catch (error) {
          return {
            projectId: proj.projectId!,
            progress: 0,
            timeline: { tasks: [], milestones: [] },
          };
        }
      });

      const timelineResults = await Promise.all(timelinePromises);
      const newProjectTimelines = timelineResults.reduce(
        (acc, { projectId, progress, timeline }) => {
          acc[projectId] = { ...timeline, progress };
          return acc;
        },
        {} as Record<string, Timeline>
      );

      setProjectTimelines(newProjectTimelines);
      setProjectsWithTimeline(
        timelineResults.reduce((acc, { projectId, timeline }) => {
          acc[projectId] =
            (timeline.tasks && timeline.tasks.length > 0) ||
            (timeline.milestones && timeline.milestones.length > 0);
          return acc;
        }, {} as { [id: string]: boolean })
      );
    } catch (err) {
      setProjects([]);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [searchQuery, statusFilter]);

  // Check for timelines
  useEffect(() => {
    if (projects.length === 0) return;
    const checkTimelines = async () => {
      const results: { [id: string]: boolean } = {};
      await Promise.all(
        projects.map(async (proj) => {
          try {
            const res = await axios.get(
              `https://www.pm.justjdmcars.com.au/api/projects/${proj.projectId}/timeline`
            );
            results[proj.projectId!] =
              (res.data?.tasks && res.data.tasks.length > 0) ||
              (res.data?.milestones && res.data.milestones.length > 0);
          } catch {
            results[proj.projectId!] = false;
          }
        })
      );
      setProjectsWithTimeline(results);
    };
    checkTimelines();
  }, [projects]);

  // Fetch project timeline and calculate progress
  const fetchProjectTimeline = async (projectId: string) => {
    if (openTimelineId === projectId) {
      setOpenTimelineId(null);
      return;
    }

    try {
      setLoadingProjectId(projectId);
      const response = await axios.get<Timeline>(
        `https://www.pm.justjdmcars.com.au/api/projects/${projectId}/timeline`
      );
      // Calculate progress based on completed tasks
      const tasks = response.data.tasks || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
      ).length;
      const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      setProjectTimelines((prev) => ({
        ...prev,
        [projectId]: { ...response.data, progress },
      }));
      setOpenTimelineId(projectId);
    } catch (error) {
      toast.error("No timeline found for this project.");
    } finally {
      setLoadingProjectId(null);
    }
  };

  // Open Edit Timeline modal and fetch timeline
  const openEditTimelineModal = async (projectId: string) => {
    setEditTimelineProjectId(projectId);
    setTimelineLoading(true);
    try {
      const response = await axios.get<Timeline>(
        `https://www.pm.justjdmcars.com.au/api/projects/${projectId}/timeline`
      );
      setEditTasks(response.data.tasks || []);
      setEditMilestones(response.data.milestones || []);
      // Calculate progress for the timeline being edited
      const tasks = response.data.tasks || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
      ).length;
      const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      setProjectTimelines((prev) => ({
        ...prev,
        [projectId]: { ...response.data, progress },
      }));
      setEditTimelineModalOpen(true);
    } catch (error) {
      toast.error("Failed to load timeline for editing");
      setEditTasks([]);
      setEditMilestones([]);
      setEditTimelineModalOpen(true);
    } finally {
      setTimelineLoading(false);
    }
  };

  // Handle task change in Edit Timeline modal
  const handleTaskChange = (
    index: number,
    field: keyof Task,
    value: string
  ) => {
    const updatedTasks = [...editTasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setEditTasks(updatedTasks);
  };

  // Handle milestone change in Edit Timeline modal
  const handleMilestoneChange = (
    index: number,
    field: keyof Milestone,
    value: string
  ) => {
    const updatedMilestones = [...editMilestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setEditMilestones(updatedMilestones);
  };

  // Save timeline changes
  const saveTimelineChanges = async () => {
    if (!editTimelineProjectId) return;
    setTimelineLoading(true);
    try {
      // Update the entire timeline (tasks and milestones)
      await axios.put(
        `https://www.pm.justjdmcars.com.au/api/projects/${editTimelineProjectId}/timeline`,
        {
          tasks: editTasks.map((task) => ({
            taskId: task.taskId,
            name: task.name,
            startDate: task.startDate,
            endDate: task.endDate,
            assignee: task.assignee,
            role: task.role,
            status: task.status,
            priority: task.priority,
          })),
          milestones: editMilestones.map((milestone) => ({
            _id: milestone._id,
            name: milestone.name,
            date: milestone.date,
          })),
        }
      );

      // Refresh timeline
      await fetchProjectTimeline(editTimelineProjectId);
      setEditTimelineModalOpen(false);
      toast.success("Timeline updated successfully!");
    } catch (err) {
      toast.error("Failed to update timeline");
    } finally {
      setTimelineLoading(false);
    }
  };

  // Open Edit Team modal
  const openEditTeamModal = (projectId: string) => {
    const project = projects.find((p) => p.projectId === projectId);
    setEditTeamProjectId(projectId);
    setEditTeamMembers(project?.team || []);
    setEditTeamModalOpen(true);
  };

  // Handle team member change
  const handleTeamMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string | number
  ) => {
    const updatedMembers = [...editTeamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setEditTeamMembers(updatedMembers);
  };

  // Add team member
  const addTeamMember = () => {
    setEditTeamMembers([
      ...editTeamMembers,
      { name: "", role: "", availability: 0 },
    ]);
  };

  // Remove team member
  const removeTeamMember = (index: number) => {
    setEditTeamMembers(editTeamMembers.filter((_, i) => i !== index));
  };

  // Save team changes
  const saveTeamChanges = async () => {
    if (!editTeamProjectId) return;
    setTeamLoading(true);
    try {
      await axios.put(
        `https://www.pm.justjdmcars.com.au/api/projects/${editTeamProjectId}`,
        { team: editTeamMembers }
      );
      await fetchProjects(pagination.currentPage);
      setEditTeamModalOpen(false);
      toast.success("Team updated successfully!");
    } catch (err) {
      toast.error("Failed to update team");
    } finally {
      setTeamLoading(false);
    }
  };

  // Open Edit Project modal
  const openEditProjectModal = (project: Project) => {
    setEditProject(project);
    setEditProjectModalOpen(true);
  };

  // Handle project field change
  const handleProjectChange = (field: keyof Project, value: string) => {
    setEditProject((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // Save project changes
  const saveProjectChanges = async () => {
    if (!editProject || !editProject.projectId) return;
    setProjectLoading(true);
    try {
      await axios.put(
        `https://www.pm.justjdmcars.com.au/api/projects/${editProject.projectId}`,
        {
          name: editProject.name,
          deliveryDate: editProject.deliveryDate,
          complexity: editProject.complexity,
          status: editProject.status,
          team: editProject.team,
        }
      );
      await fetchProjects(pagination.currentPage);
      setEditProjectModalOpen(false);
      setModalOpen(false);
      toast.success("Project updated successfully!");
    } catch (err) {
      toast.error("Failed to update project");
    } finally {
      setProjectLoading(false);
    }
  };

  // Card click handler
  const handleProjectClick = async (projectId: string | undefined) => {
    if (!projectId) return;
    setSelectedProjectId(projectId);
    setModalOpen(true);
    setDetailLoading(true);
    try {
      const res = await axios.get<Project>(
        `https://www.pm.justjdmcars.com.au/api/projects/${projectId}`
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
            {new Date().toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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
            placeholder="Search projects by name..."
            className="px-3 py-1.5 border rounded-md text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-3 py-1.5 border rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex space-x-1">
          <button className="p-2 border rounded-md bg-white hover:bg-gray-200 text-black">
            <FiGrid />
          </button>
          <button className="p-2 border rounded-md bg-white hover:bg-gray-200 text-black">
            <FiList />
          </button>
          <AddProject />
        </div>
      </div>

      {/* Cards */}
      <div className="bg-gray-100 px-6 py-6">
        {loading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj: any, index: number) => (
                <div
                  key={proj._id || index}
                  className="rounded-xl shadow-sm p-5 hover:shadow-lg transition bg-white"
                  title="View project details"
                  onClick={() => handleProjectClick(proj.projectId)}
                >
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
                          : proj.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : proj.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
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
                      style={{
                        width: `${
                          projectTimelines[proj.projectId]?.progress || 0
                        }%`,
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Progress:{" "}
                    {Math.round(
                      projectTimelines[proj.projectId]?.progress || 0
                    )}
                    %
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
                  <div className="flex flex-wrap gap-2">
                    {projectsWithTimeline[proj.projectId] && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchProjectTimeline(proj.projectId);
                          }}
                          className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition text-sm"
                        >
                          {openTimelineId === proj.projectId
                            ? "Close Timeline"
                            : "View Timeline"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditTimelineModal(proj.projectId);
                          }}
                          className="bg-white text-yellow-600 border border-yellow-600 px-3 py-1 rounded hover:bg-yellow-50 transition text-sm"
                        >
                          Edit Timeline
                        </button>
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditTeamModal(proj.projectId);
                      }}
                      className="bg-white text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50 transition text-sm"
                    >
                      Edit Team
                    </button>
                    {!projectsWithTimeline[proj.projectId] && (
                      <button
                        className="bg-[#0E1422] text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setScopeUploadProjectId(proj.projectId);
                        }}
                      >
                        Upload Scope
                      </button>
                    )}
                  </div>
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
                                className="p-2 mb-2 rounded border text-sm text-gray-800"
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
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-xs text-gray-600">
              <div>
                Showing{" "}
                {pagination.totalItems === 0
                  ? 0
                  : (pagination.currentPage - 1) * pagination.itemsPerPage + 1}
                -
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{" "}
                of {pagination.totalItems} projects
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200"
                  onClick={() => fetchProjects(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  {"<"}
                </button>
                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded-md ${
                      pagination.currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => fetchProjects(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-2 py-1 border rounded-md bg-white hover:bg-gray-200"
                  onClick={() => fetchProjects(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  {">"}
                </button>
              </div>
            </div>
          </>
        )}
        {/* Project Detail Modal */}
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
                <IoCloseCircleOutline size={24} />
              </button>
              {detailLoading ? (
                <div className="text-center py-10">Loading...</div>
              ) : projectDetail && !("error" in projectDetail) ? (
                <>
                  <h2 className="text-xl font-bold mb-2 text-black">
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
                  <button
                    onClick={() => openEditProjectModal(projectDetail)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit Project
                  </button>
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
        {/* Edit Timeline Modal */}
        {editTimelineModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative overflow-y-auto max-h-[80vh]">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setEditTimelineModalOpen(false)}
              >
                <IoCloseCircleOutline size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-black">
                Edit Timeline
              </h2>
              {timelineLoading ? (
                <div className="text-center py-10">Loading timeline...</div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      Tasks
                    </h3>
                    {editTasks.length > 0 ? (
                      editTasks.map((task, index) => (
                        <div
                          key={task.taskId}
                          className="p-3 mb-2 rounded bg-gray-50"
                        >
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) =>
                              handleTaskChange(index, "name", e.target.value)
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                            placeholder="Task Name"
                          />
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleTaskChange(index, "status", e.target.value)
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                          >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Delayed">Delayed</option>
                          </select>
                          <input
                            type="text"
                            value={task.assignee}
                            onChange={(e) =>
                              handleTaskChange(
                                index,
                                "assignee",
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                            placeholder="Assignee"
                          />
                          <input
                            type="text"
                            value={task.role}
                            onChange={(e) =>
                              handleTaskChange(index, "role", e.target.value)
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                            placeholder="Role"
                          />
                          <select
                            value={task.priority}
                            onChange={(e) =>
                              handleTaskChange(
                                index,
                                "priority",
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                          <input
                            type="date"
                            value={task.startDate.split("T")[0]}
                            onChange={(e) =>
                              handleTaskChange(
                                index,
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                          />
                          <input
                            type="date"
                            value={task.endDate.split("T")[0]}
                            onChange={(e) =>
                              handleTaskChange(index, "endDate", e.target.value)
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No tasks available
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      Milestones
                    </h3>
                    {editMilestones.length > 0 ? (
                      editMilestones.map((milestone, index) => (
                        <div
                          key={milestone._id}
                          className="p-3 mb-2 rounded bg-gray-50"
                        >
                          <input
                            type="text"
                            value={milestone.name}
                            onChange={(e) =>
                              handleMilestoneChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                            placeholder="Milestone Name"
                          />
                          <input
                            type="date"
                            value={milestone.date.split("T")[0]}
                            onChange={(e) =>
                              handleMilestoneChange(
                                index,
                                "date",
                                e.target.value
                              )
                            }
                            className="w-full border rounded p-1 mb-2 text-sm"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No milestones available
                      </div>
                    )}
                  </div>
                  <button
                    onClick={saveTimelineChanges}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                    disabled={timelineLoading}
                  >
                    {timelineLoading ? "Saving..." : "Save Timeline"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Edit Team Modal */}
        {editTeamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setEditTeamModalOpen(false)}
              >
                <IoCloseCircleOutline size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-black">Edit Team</h2>
              <div className="space-y-4">
                {editTeamMembers.map((member, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "name", e.target.value)
                      }
                      className="border rounded p-1 text-sm flex-1"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "role", e.target.value)
                      }
                      className="border rounded p-1 text-sm flex-1"
                      placeholder="Role"
                    />
                    <input
                      type="number"
                      value={member.availability}
                      onChange={(e) =>
                        handleTeamMemberChange(
                          index,
                          "availability",
                          Number(e.target.value)
                        )
                      }
                      className="border rounded p-1 text-sm w-20"
                      placeholder="Availability"
                    />
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="text-red-500 text-xs"
                    >
                      <IoMdCloseCircleOutline size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTeamMember}
                  className="text-blue-600 text-sm"
                >
                  + Add Team Member
                </button>
                <button
                  onClick={saveTeamChanges}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                  disabled={teamLoading}
                >
                  {teamLoading ? "Saving..." : "Save Team"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Edit Project Modal */}
        {editProjectModalOpen && editProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={() => setEditProjectModalOpen(false)}
              >
                <IoCloseCircleOutline size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4 text-black">
                Edit Project
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={editProject.name}
                    onChange={(e) =>
                      handleProjectChange("name", e.target.value)
                    }
                    className="w-full border rounded p-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={editProject.deliveryDate?.split("T")[0] || ""}
                    onChange={(e) =>
                      handleProjectChange("deliveryDate", e.target.value)
                    }
                    className="w-full border rounded p-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Complexity
                  </label>
                  <select
                    value={editProject.complexity}
                    onChange={(e) =>
                      handleProjectChange("complexity", e.target.value)
                    }
                    className="w-full border rounded p-1 text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Status
                  </label>
                  <select
                    value={editProject.status}
                    onChange={(e) =>
                      handleProjectChange("status", e.target.value)
                    }
                    className="w-full border rounded p-1 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Team Members
                  </label>
                  {editProject.team?.map((member, index) => (
                    <div key={index} className="flex gap-2 items-center mb-2">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const updatedTeam = [...(editProject.team || [])];
                          updatedTeam[index].name = e.target.value;
                          setEditProject({ ...editProject, team: updatedTeam });
                        }}
                        className="border rounded p-1 text-sm flex-1"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const updatedTeam = [...(editProject.team || [])];
                          updatedTeam[index].role = e.target.value;
                          setEditProject({ ...editProject, team: updatedTeam });
                        }}
                        className="border rounded p-1 text-sm flex-1"
                        placeholder="Role"
                      />
                      <input
                        type="number"
                        value={member.availability}
                        onChange={(e) => {
                          const updatedTeam = [...(editProject.team || [])];
                          updatedTeam[index].availability = Number(
                            e.target.value
                          );
                          setEditProject({ ...editProject, team: updatedTeam });
                        }}
                        className="border rounded p-1 text-sm w-20"
                        placeholder="Availability"
                      />
                      <button
                        onClick={() => {
                          const updatedTeam = (editProject.team || []).filter(
                            (_, i) => i !== index
                          );
                          setEditProject({ ...editProject, team: updatedTeam });
                        }}
                        className="text-red-500 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setEditProject({
                        ...editProject,
                        team: [
                          ...(editProject.team || []),
                          { name: "", role: "", availability: 0 },
                        ],
                      });
                    }}
                    className="text-blue-600 text-sm"
                  >
                    + Add Team Member
                  </button>
                </div>
                <button
                  onClick={saveProjectChanges}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                  disabled={projectLoading}
                >
                  {projectLoading ? "Saving..." : "Save Project"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ScopeUploader Modal */}
        {scopeUploadProjectId && (
          <ScopeUploader
            projectId={scopeUploadProjectId}
            onClose={() => {
              setScopeUploadProjectId(null);
              fetchProjects(pagination.currentPage);
            }}
          />
        )}
      </div>
    </div>
  );
}
