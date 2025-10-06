import React from "react";
import ComplaintList from "../Complaints/ComplaintList";
import reportService from "../../services/reportService";

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Complaints</h1>
        <button
          onClick={reportService.exportComplaintsCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Export Report
        </button>
      </div>
      <ComplaintList type="admin" />
    </div>
  );
}
