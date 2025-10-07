import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import complaintService from "../../services/complaintService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import "./ComplaintDetails.css";

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
    <div className="complaint-details-page">
      {complaint.photo && (
        <img
          src={complaint.photo}
          alt="Complaint"
          className="complaint-details-photo"
        />
      )}
      <div className="complaint-details-info">
        <h2 className="complaint-details-type">{complaint.type}</h2>
        <span className={`status-badge ${complaint.status.toLowerCase()}`}>
          {complaint.status}
        </span>
        <p className="complaint-details-desc">{complaint.description}</p>

        {complaint.location?.address && (
          <p className="complaint-details-location">
            📍 {complaint.location.address}
          </p>
        )}

        <p className="complaint-details-date">
          Submitted on: {new Date(complaint.createdAt).toLocaleString()}
        </p>

        {user.role !== "citizen" && (
          <div className="complaint-resolution-section">
            <textarea
              placeholder="Add resolution note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="complaint-resolution-note"
            />
            <div className="complaint-resolution-buttons">
              <button
                onClick={() => handleStatusChange("IN_PROGRESS")}
                className="btn-in-progress"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleStatusChange("RESOLVED")}
                className="btn-resolved"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        )}

        {complaint.resolutionNote && (
          <p className="complaint-resolution-text">
            <strong>Resolution Note:</strong> {complaint.resolutionNote}
          </p>
        )}
      </div>
    </div>
  );
}
