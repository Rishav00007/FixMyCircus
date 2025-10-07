import React from "react";
import { Link } from "react-router-dom";
import ComplaintList from "../Complaints/ComplaintList";
import "./CitizenDashboard.css";

export default function CitizenDashboard() {
  return (
    <div className="citizen-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Complaints</h1>
          <p className="dashboard-subtitle">
            View and manage all your submitted complaints.
          </p>
        </div>
        <Link to="/complaints/new" className="new-complaint-btn">
          + New Complaint
        </Link>
      </div>

      <div className="complaint-section">
        <ComplaintList type="citizen" />
      </div>
    </div>
  );
}
