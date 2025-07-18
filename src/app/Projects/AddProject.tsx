"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProject() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [complexity, setComplexity] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async () => {
    if (!name || !deliveryDate) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`,
        {
          name,
          deliveryDate,
          complexity,
          team: [
            {
              name: "Alice",
              role: "Developer",
              availability: 20,
            },
          ],
        }
      );
      setSuccessMsg("Project created successfully!");
      setShowForm(false);
      setName("");
      setDeliveryDate("");
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
    <div>
      <button
        className="px-2 py-2 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
        onClick={() => setShowForm(!showForm)}
      >
        + Add New Project
      </button>

      {showForm && (
        <div className="mt-4 bg-white shadow rounded-lg p-4 space-y-4 w-full sm:w-96">
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />

          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />

          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>

          {successMsg && (
            <p className="text-green-600 text-sm font-medium">{successMsg}</p>
          )}
        </div>
      )}
    </div>
  );
}
