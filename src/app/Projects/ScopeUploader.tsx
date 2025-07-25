import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ScopeUploaderProps {
  projectId: string;
  onClose: () => void;
}

const ScopeUploader: React.FC<ScopeUploaderProps> = ({
  projectId,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [manualScope, setManualScope] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  // Team as array of objects
  const [team, setTeam] = useState([
    { name: "", role: "", availability: "" },
  ]);
  const [complexity, setComplexity] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setManualScope(""); // Clear manual if file selected
    }
  };

  const handleManualScopeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setManualScope(e.target.value);
    setFile(null); // Clear file if manual entered
  };

  // Team member handlers
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!file && !manualScope) {
      setError("Please upload a file or enter scope text.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append("scope", file);
      } else {
        // Convert manual text to a Blob and append as file
        const blob = new Blob([manualScope], { type: "text/plain" });
        formData.append("scope", blob, "scope.txt");
      }
      if (deliveryDate) formData.append("deliveryDate", deliveryDate);
      // Only include team if at least one member has a non-empty field
      const filteredTeam = team.filter(
        (m) => m.name || m.role || m.availability
      );
      if (filteredTeam.length > 0) {
        formData.append(
          "team",
          JSON.stringify(
            filteredTeam.map((member) => ({
              name: member.name,
              role: member.role,
              availability: Number(member.availability),
            }))
          )
        );
      }
      if (complexity) formData.append("complexity", complexity);

      const apiUrl = `https://www.pm.justjdmcars.com.au/api/projects/${projectId}/scope`;
      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Scope processed successfully!");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err: any) {
      const apiError = err?.response?.data?.message || "Unrealistic timeline: Insufficient team capacity. Add resources or extend deadline.";
      setError(apiError);
      toast.error(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-black">
          Upload or Enter Project Scope
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Scope File (PDF, DOCX, TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="block w-full border rounded p-1"
              disabled={!!manualScope}
            />
          </div>
          <div className="text-center text-gray-500 text-xs">OR</div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Enter Scope Text
            </label>
            <textarea
              value={manualScope}
              onChange={handleManualScopeChange}
              className="w-full border rounded p-2 min-h-[80px] text-gray-700"
              placeholder="Type project scope here..."
              disabled={!!file}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Delivery Date (optional)
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full border rounded p-1"
            />
          </div>
          {/* Team Members Section */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Team Members
            </label>
            {team.map((member, idx) => (
              <div key={idx} className="mb-2 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleTeamChange(idx, "name", e.target.value)}
                  className="border px-2 py-1 rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={member.role}
                  onChange={(e) => handleTeamChange(idx, "role", e.target.value)}
                  className="border px-2 py-1 rounded text-xs"
                />
                <input
                  type="number"
                  placeholder="Availability"
                  value={member.availability}
                  onChange={(e) => handleTeamChange(idx, "availability", e.target.value)}
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
          {/* Complexity Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Complexity
            </label>
            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm mb-4"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Processing..." : "Process Project Scope"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScopeUploader;
