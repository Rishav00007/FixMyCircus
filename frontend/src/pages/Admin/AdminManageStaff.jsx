// frontend/src/components/Admin/AdminManageStaff.jsx
import "./AdminManageStaff.css";
import React, { useEffect, useState } from "react";
import staffService from "../../services/staffService.js";
import "../../components/Dashboard/AdminDashboard.css";

export default function AdminManageStaff() {
  const [staffUsers, setStaffUsers] = useState([]);
  const [departments] = useState(["pathway", "water", "garbage", "general"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUnassignedUsers();
  }, []);

  const loadUnassignedUsers = async () => {
    setLoading(true);
    try {
      const res = await staffService.getUnassignedUsers();
      setStaffUsers(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (userId, department) => {
    if (!department) return;
    try {
      await staffService.assignDepartment(userId, department);
      alert("Department assigned successfully!");
      // Refresh the list so assigned user disappears
      loadUnassignedUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error assigning department");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-manage-staff">
      <h1>Manage Staff</h1>
      {staffUsers.length === 0 ? (
        <p>All staff have been assigned to departments.</p>
      ) : (
        <table className="admin-staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Assign Department</th>
            </tr>
          </thead>
          <tbody>
            {staffUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="department-select"
                    onChange={(e) => handleAssign(user._id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select department
                    </option>
                    {departments.map((dep) => (
                      <option key={dep} value={dep}>
                        {dep.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
