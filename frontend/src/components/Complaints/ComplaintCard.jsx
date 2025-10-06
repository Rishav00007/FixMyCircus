import React from "react";

export default function ComplaintCard({ complaint, onClick }) {
  const statusColor = {
    OPEN: "bg-yellow-200 text-yellow-800",
    IN_PROGRESS: "bg-blue-200 text-blue-800",
    RESOLVED: "bg-green-200 text-green-800",
  }[complaint.status];

  return (
    <div
      onClick={() => onClick && onClick(complaint._id)}
      className="bg-white shadow-md p-4 rounded-xl cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{complaint.type.toUpperCase()}</h3>
        <span className={`text-sm px-3 py-1 rounded-full ${statusColor}`}>
          {complaint.status}
        </span>
      </div>
      <p className="text-gray-600 mt-2">{complaint.description.slice(0, 100)}...</p>
      {complaint.photo && (
        <img
          src={complaint.photo}
          alt="Complaint"
          className="rounded-lg mt-3 h-32 w-full object-cover"
        />
      )}
      <p className="text-xs text-gray-400 mt-2">
        {complaint.location?.address || "No address"}
      </p>
    </div>
  );
}
