
import React, { useState, useEffect } from "react";
import staffService from "../../services/staffService";
import complaintService from "../../services/complaintService";
import "./DepartmentStaff.css";

export default function DepartmentStaff({ department }) {
  const [staffList, setStaffList] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");

  useEffect(() => {
    if (department) {
      loadStaff();
      loadComplaints();
    }
  }, [department]);

  // Fetch staff belonging to the department
  const loadStaff = async () => {
    try {
      const { data } = await staffService.getStaffByDepartment(department);
      setStaffList(data.staffList || []);
    } catch (err) {
      console.error("Error loading staff:", err);
      setStaffList([]);
    }
  };

  // Fetch only unassigned complaints
  const loadComplaints = async () => {
    try {
      const { data } = await complaintService.getAllComplaints();
      const unassigned = (data.complaints || []).filter(
        (c) => !c.assignedTo // Only complaints not assigned
      );
      setComplaints(unassigned);
    } catch (err) {
      console.error("Error loading complaints:", err);
      setComplaints([]);
    }
  };

  // Assign selected complaint to a staff member
  const handleAssign = async (staffId) => {
    if (!selectedComplaint) return alert("Select a complaint first!");
    try {
      await staffService.assignComplaintToStaff(staffId, selectedComplaint);
      alert("Complaint assigned successfully!");
      setSelectedComplaint("");
      // Refresh both lists after assignment
      loadComplaints();
      loadStaff();
    } catch (error) {
      console.error("Error assigning complaint:", error);
      alert("Failed to assign complaint. Try again.");
    }
  };

  return (
    <div className="department-staff">
      <h2>{department?.toUpperCase()} Department</h2>

      <select
        onChange={(e) => setSelectedComplaint(e.target.value)}
        value={selectedComplaint}
      >
        <option value="">Select Complaint</option>
        {complaints.map((c) => (
          <option key={c._id} value={c._id}>
            {c.type} - {c.status}
          </option>
        ))}
      </select>

      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Assigned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((s) => (
            <tr key={s._id}>
              <td>{s.staffUser?.name}</td>
              <td>{s.staffUser?.email}</td>
              <td>{s.assignedComplaints?.length || 0}</td>
              <td>
                <button onClick={() => handleAssign(s._id)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

