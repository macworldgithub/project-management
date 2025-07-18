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
      setShowModal(false);
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
