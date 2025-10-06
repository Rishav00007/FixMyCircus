import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import complaintService from "../../services/complaintService.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ComplaintDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [note, setNote] = useState("");

  const fetchComplaint = async () => {
    const res = await complaintService.getComplaintById(id);
    setComplaint(res.data.complaint);
  };

  const handleStatusChange = async (status) => {
    await complaintService.updateComplaintStatus(id, {
      status,
      resolutionNote: note,
    });
    fetchComplaint();
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  if (!complaint) return <p>Loading complaint...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-2">{complaint.type}</h2>
      <p className="text-gray-700 mb-4">{complaint.description}</p>

      {complaint.photo && (
        <img
          src={complaint.photo}
          alt="Complaint"
          className="rounded-lg mb-4 w-full h-64 object-cover"
        />
      )}

      <p>
        <strong>Status:</strong> {complaint.status}
      </p>
      <p>
        <strong>Address:</strong> {complaint.location?.address}
      </p>

      {user.role !== "citizen" && (
        <div className="mt-4">
          <textarea
            placeholder="Add resolution note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded-md w-full p-2 mb-2"
          ></textarea>

          <div className="flex gap-3">
            <button
              onClick={() => handleStatusChange("IN_PROGRESS")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Mark In Progress
            </button>
            <button
              onClick={() => handleStatusChange("RESOLVED")}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Mark Resolved
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
