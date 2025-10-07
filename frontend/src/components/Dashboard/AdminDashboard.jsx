import React from "react";
import ComplaintList from "../Complaints/ComplaintList";
import reportService from "../../services/reportService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">All Complaints</h1>
        <button
          onClick={reportService.exportComplaintsCSV}
          className="export-btn"
        >
          Export Report
        </button>
      </div>
      <ComplaintList type="admin" />
    </div>
  );
}
