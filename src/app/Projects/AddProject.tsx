"use client";
import { useState } from "react";
import axios from "axios";
import { XIcon } from "lucide-react";

export default function AddProject() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [complexity, setComplexity] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [team, setTeam] = useState([
    { name: "", role: "", availability: "" }
  ]);

  const handleTeamChange = (idx: number, field: "name" | "role" | "availability", value: string) => {
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

  const handleSubmit = async () => {
    if (!name || !deliveryDate || team.some(m => !m.name || !m.role || !m.availability)) return;
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`,
        {
          name,
          deliveryDate: new Date(deliveryDate).toISOString(),
          complexity,
          team: team.map(member => ({
            name: member.name,
            role: member.role,
            availability: Number(member.availability)
          })),
        }
      );
      setSuccessMsg("Project created successfully!");
      setShowModal(false);
      setName("");
      setDeliveryDate("");
      setComplexity("Medium");
      setTeam([{ name: "", role: "", availability: "" }]);
    } catch (error: any) {
      alert(
        "Failed to create project: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="px-2 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        + Add New Project
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setShowModal(false)}
            >
              <XIcon size={18} />
            </button>

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
              className="w-full border px-3 py-2 rounded text-sm mb-3"
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
              <label className="block text-sm font-medium mb-1">Team Members</label>
              {team.map((member, idx) => (
                <div key={idx} className="mb-2 flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={e => handleTeamChange(idx, "name", e.target.value)}
                    className="border px-2 py-1 rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={member.role}
                    onChange={e => handleTeamChange(idx, "role", e.target.value)}
                    className="border px-2 py-1 rounded text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Availability"
                    value={member.availability}
                    onChange={e => handleTeamChange(idx, "availability", e.target.value)}
                    className="border px-2 py-1 rounded text-xs w-20"
                  />
                  {team.length > 1 && (
                    <button type="button" onClick={() => removeTeamMember(idx)} className="text-red-500 text-xs">X</button>
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
          </div>
        </div>
      )}
    </>
  );
}
