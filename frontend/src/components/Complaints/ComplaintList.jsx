import React, { useEffect, useState } from "react";
import { useComplaints } from "../../context/ComplaintContext.jsx";
import { useNavigate } from "react-router-dom";
import ComplaintCard from "./ComplaintCard.jsx";
import "./ComplaintList.css";

export default function ComplaintList({ type }) {
  // ✅ Added 'type' prop
  const { complaints, fetchComplaints, loading } = useComplaints();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchComplaints(type); // ✅ Pass type to fetchComplaints
  }, [type]);

  const filteredComplaints = filterType
    ? complaints.filter((c) => c.type === filterType)
    : complaints;

  if (loading)
    return (
      <div className="complaint-list-loading">
        <div className="spinner"></div>
        <p>Loading complaints...</p>
      </div>
    );

  return (
    <div className="complaint-list-wrapper">
      <div className="filter-bar">
        <label>Filter by Type: </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="pathway">Pathway</option>
          <option value="water">Water</option>
          <option value="garbage">Garbage</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="complaint-list-container">
        {filteredComplaints.length ? (
          filteredComplaints.map((c) => (
            <ComplaintCard
              key={c._id}
              complaint={c}
              onClick={() => navigate(`/complaints/${c._id}`)}
              type={type} // ✅ Pass type so delete button shows for admin
            />
          ))
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
    </div>
  );
}
