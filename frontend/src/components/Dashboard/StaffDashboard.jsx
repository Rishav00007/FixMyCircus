import React from "react";
import ComplaintList from "../Complaints/ComplaintList";

export default function StaffDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Assigned Complaints</h1>
      <ComplaintList type="staff" />
    </div>
  );
}
