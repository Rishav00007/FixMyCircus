import React, { useEffect } from "react";
import { useComplaints } from "../../context/ComplaintContext.jsx";
import { useNavigate } from "react-router-dom";
import ComplaintCard from "./ComplaintCard.jsx";

export default function ComplaintList({ type }) {
  const { complaints, fetchComplaints, loading } = useComplaints();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints(type);
  }, [type]);

  if (loading) return <p>Loading complaints...</p>;
  if (!complaints.length) return <p>No complaints found.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
