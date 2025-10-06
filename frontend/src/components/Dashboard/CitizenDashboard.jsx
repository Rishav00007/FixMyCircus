import React from "react";
import { Link } from "react-router-dom";
import ComplaintList from "../Complaints/ComplaintList";

export default function CitizenDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Complaints</h1>
        <Link
          to="/complaints/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + New Complaint
        </Link>
      </div>
      <ComplaintList type="citizen" />
    </div>
  );
}
