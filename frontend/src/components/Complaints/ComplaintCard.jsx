import React from "react";
import complaintService from "../../services/complaintService.js"; //   Import service
import "./ComplaintCard.css";

export default function ComplaintCard({ complaint, onClick, type }) {
  const { type: cType, description, status, photo, location, createdAt, _id, dueDate, slaBreached } = complaint;

  const handleDelete = async (e) => {
    e.stopPropagation(); //   Prevent card click navigation
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;
    try {
      await complaintService.deleteComplaint(_id); //   Call delete API
      alert("Complaint deleted successfully!");
      window.location.reload(); //   Simple way to refresh list after deletion
    } catch (err) {
      console.error(err);
      alert("Failed to delete complaint");
    }
  };
  
  return (
    <div
      className={`complaint-card ${slaBreached ? "overdue" : ""}`}
      onClick={() => onClick && onClick(complaint._id)}
    >
      {photo && (
        <img
          src={photo}
          alt="Complaint"
          className="complaint-card-image"
          loading="lazy"
        />
      )}
      <div className="complaint-card-content">
        <h3 className="complaint-type">{cType}</h3>
        <p className="complaint-description">
          {description.length > 100 ? description.substring(0, 100) + "..." : description}
        </p>

        {location?.address && (
          <p className="complaint-address">📍 {location.address}</p>
        )}

        <div className="complaint-card-footer">
          <span className={`status-badge ${status.toLowerCase()}`}>
            {status}
          </span>
          <span className="complaint-date">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          {type === "admin" && (
            <button
              className="delete-btn"
              onClick={handleDelete} //   Delete on click
            >
              Delete
            </button>
          )}
        </div>

        {dueDate && (
          <p className="complaint-due-date">
            Due: {new Date(dueDate).toLocaleString()}
          </p>
        )}

        {slaBreached && <span className="sla-alert">⚠ Overdue</span>}
      </div>
    </div>
  );
}
