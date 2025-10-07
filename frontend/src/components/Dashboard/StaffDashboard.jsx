import React from "react";
import ComplaintList from "../Complaints/ComplaintList";
import "./StaffDashboard.css";

export default function StaffDashboard() {
  return (
    <div className="staff-dashboard">
      <h1 className="dashboard-title">Assigned Complaints</h1>
      <ComplaintList type="staff" />
    </div>
  );
}
