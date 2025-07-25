"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { XIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProject() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [complexity, setComplexity] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [team, setTeam] = useState([{ name: "", role: "", availability: "" }]);
  const [scopeType, setScopeType] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scopeFile, setScopeFile] = useState<File | null>(null);
  const [scopeTeamString, setScopeTeamString] = useState<string>("");
  const [scopeTeam, setScopeTeam] = useState([
    { name: "", role: "", availability: "" },
  ]);
  const [scopeName, setScopeName] = useState("");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleTeamChange = (
    idx: number,
    field: "name" | "role" | "availability",
    value: string
  ) => {
    const updated = [...team];
    updated[idx][field] = value;
    setTeam(updated);
  };

  const addTeamMember = () => {
    setTeam([...team, { name: "", role: "", availability: "" }]);
  };

  const removeTeamMember = (idx: number) => {
    setTeam(team.filter((_, i) => i !== idx));
  };

  const handleScopeTeamChange = (
    idx: number,
    field: "name" | "role" | "availability",
    value: string
  ) => {
    const updated = [...scopeTeam];
    updated[idx][field] = value;
    setScopeTeam(updated);
  };
  const addScopeTeamMember = () => {
    setScopeTeam([...scopeTeam, { name: "", role: "", availability: "" }]);
  };
  const removeScopeTeamMember = (idx: number) => {
    setScopeTeam(scopeTeam.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !deliveryDate ||
      team.some((m) => !m.name || !m.role || !m.availability)
    )
      return;
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
        name,
        deliveryDate: new Date(deliveryDate).toISOString(),
        complexity,
        team: team.map((member) => ({
          name: member.name,
          role: member.role,
          availability: Number(member.availability),
        })),
      });
      setSuccessMsg("Project created successfully!");
      setShowModal(false);
      setName("");
      setDeliveryDate("");
      setComplexity("Medium");
      setTeam([{ name: "", role: "", availability: "" }]);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create project: Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScopeFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scopeName) {
      toast.error("Project name is required.");
      return;
    }
    if (!scopeFile) {
      toast.error("Please select a scope file.");
      return;
    }
    // Team validation
    if (scopeTeam.some((m) => !m.name || !m.role || !m.availability)) {
      toast.error("Please fill all team member fields.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("scope", scopeFile);
      formData.append("name", scopeName);
      formData.append(
        "deliveryDate",
        deliveryDate ? new Date(deliveryDate).toISOString() : ""
      );
      formData.append(
        "team",
        JSON.stringify(
          scopeTeam.map((member) => ({
            name: member.name,
            role: member.role,
            availability: Number(member.availability),
          }))
        )
      );
      formData.append("complexity", complexity);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/scope`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMsg("Project with scope file created successfully!");
      setShowModal(false);
      setScopeFile(null);
      setScopeName("");
      setDeliveryDate("");
      setComplexity("Medium");
      setScopeTeam([{ name: "", role: "", availability: "" }]);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create project with scope file: Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative inline-block mb-4" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-md hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          + Add New Project
          <svg
            className={`w-4 h-4 transition-transform duration-150 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in">
            <button
              className="block w-full text-left px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-t-lg transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                setScopeType("manual");
                setShowModal(true);
              }}
            >
              <span className="font-semibold">With Manually Scope</span>
              <div className="text-xs text-gray-500">
                Enter project details manually
              </div>
            </button>
            <button
              className="block w-full text-left px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-b-lg transition-colors"
              onClick={() => {
                setDropdownOpen(false);
                setScopeType("file");
                setShowModal(true);
              }}
            >
              <span className="font-semibold">With Scope File</span>
              <div className="text-xs text-gray-500">
                Upload a file for project scope
              </div>
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              <XIcon size={18} />
            </button>

            {scopeType === "file" ? (
              <form onSubmit={handleScopeFileSubmit}>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Create New Project (With Scope File)
                </h2>
                <label className="block text-sm font-medium mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={scopeName}
                  onChange={(e) => setScopeName(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm mb-3"
                  required
                />
                <label className="block text-sm font-medium mb-1">
                  Project scope as a file (PDF, DOCX, or TXT, &lt;10MB)
                </label>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) =>
                    setScopeFile(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full border px-3 py-2 rounded text-sm mb-3"
                  required
                />
                <label className="block text-sm font-medium mb-1 text-black">
                  Delivery Date (ISO 8601)
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm mb-3 :placeholder-text-gray-900"
                  required
                />
                <label className="block text-sm font-medium mb-1 text-black">
                  Team Members
                </label>
                {scopeTeam.map((member, idx) => (
                  <div key={idx} className="mb-2 flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) =>
                        handleScopeTeamChange(idx, "name", e.target.value)
                      }
                      className="border  py-1 rounded text-xs text-black placeholder:text-gray-400"
                    />
                    <select
                      value={member.role}
                      onChange={(e) => handleScopeTeamChange(idx, "role", e.target.value)}
                      className="border py-1 rounded text-xs"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="PM">PM</option>
                      <option value="QA">QA</option>
                      <option value="Backend">Backend</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Design">Design</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Availability"
                      value={member.availability}
                      onChange={(e) =>
                        handleScopeTeamChange(
                          idx,
                          "availability",
                          e.target.value
                        )
                      }
                      className="border px-2 py-1 rounded text-xs w-20 text-black placeholder:text-gray-400"
                    />
                    {scopeTeam.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeScopeTeamMember(idx)}
                        className="text-red-500 text-xs"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addScopeTeamMember}
                  className="text-blue-600 text-xs mb-3"
                >
                  + Add Team Member
                </button>
                <label className="block text-sm font-medium mb-1 text-black">
                  Complexity
                </label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm mb-4 text-black placeholder:text-gray-400"
                  required
                >
                  <option value="Low" className="">
                    Low
                  </option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>
                {successMsg && (
                  <p className="text-green-600 text-sm font-medium mt-3">
                    {successMsg}
                  </p>
                )}
              </form>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Create New Project
                </h2>

                <input
                  type="text"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm mb-3"
                />

                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm mb-3 text-black placeholder:text-gray-400"
                />

                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm mb-4"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                {/* Team Members Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Team Members
                  </label>
                  {team.map((member, idx) => (
                    <div key={idx} className="mb-2 flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) =>
                          handleTeamChange(idx, "name", e.target.value)
                        }
                        className="border px-2 py-1 rounded text-xs"
                      />
                      <select
                        value={member.role}
                        onChange={(e) => handleTeamChange(idx, "role", e.target.value)}
                        className="border px-2 py-1 rounded text-xs"
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="PM">PM</option>
                        <option value="QA">QA</option>
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Design">Design</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Availability"
                        value={member.availability}
                        onChange={(e) =>
                          handleTeamChange(idx, "availability", e.target.value)
                        }
                        className="border px-2 py-1 rounded text-xs w-20"
                      />
                      {team.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTeamMember(idx)}
                          className="text-red-500 text-xs"
                        >
                          X
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="text-blue-600 text-xs mb-3"
                  >
                    + Add Team Member
                  </button>
                </div>



                

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>

                {successMsg && (
                  <p className="text-green-600 text-sm font-medium mt-3">
                    {successMsg}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}




