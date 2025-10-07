import React, { useEffect } from "react";
import { useComplaints } from "../../context/ComplaintContext.jsx";
import { useNavigate } from "react-router-dom";
import ComplaintCard from "./ComplaintCard.jsx";
import "./ComplaintList.css";

export default function ComplaintList({ type }) {
  const { complaints, fetchComplaints, loading } = useComplaints();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints(type);
  }, [type]);

  if (loading)
    return (
      <div className="complaint-list-loading">
        <div className="spinner"></div>
        <p>Loading complaints...</p>
      </div>
    );

  if (!complaints.length)
    return (
      <div className="complaint-list-empty">
        <p>No complaints found.</p>
      </div>
    );

  return (
    <div className="complaint-list-container">
      {complaints.map((c) => (
        <ComplaintCard
          key={c._id}
          complaint={c}
          onClick={(id) => navigate(`/complaints/${id}`)}
        />
      ))}
    </div>
  );
}
