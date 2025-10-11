// import React from "react";
// import "./ComplaintCard.css";

// export default function ComplaintCard({ complaint, onClick }) {
//   const { type, description, status, photo, location, createdAt } = complaint;

//   return (
//     <div className="complaint-card" onClick={() => onClick(complaint._id)}>
//       {photo && (
//         <img
//           src={photo}
//           alt="Complaint"
//           className="complaint-card-image"
//           loading="lazy"
//         />
//       )}
//       <div className="complaint-card-content">
//         <h3 className="complaint-type">{type}</h3>
//         <p className="complaint-description">
//           {description.length > 100
//             ? description.substring(0, 100) + "..."
//             : description}
//         </p>

//         {location?.address && (
//           <p className="complaint-address">📍 {location.address}</p>
//         )}

//         <div className="complaint-card-footer">
//           <span className={`status-badge ${status.toLowerCase()}`}>
//             {status}
//           </span>
//           <span className="complaint-date">
//             {new Date(createdAt).toLocaleDateString()}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import "./ComplaintCard.css";

export default function ComplaintCard({ complaint, onClick }) {
  const { type, description, status, photo, location, createdAt, dueDate, slaBreached } = complaint;

  return (
    <div
      className={`complaint-card ${slaBreached ? "overdue" : ""}`}
      onClick={() => onClick && onClick(complaint._id)}
    >
      {photo && (
        <img
          src={photo}
          alt="Complaint"
          className="complaint-card-image"
          loading="lazy"
        />
      )}
      <div className="complaint-card-content">
        <h3 className="complaint-type">{type}</h3>
        <p className="complaint-description">
          {description.length > 100 ? description.substring(0, 100) + "..." : description}
        </p>

        {location?.address && (
          <p className="complaint-address">📍 {location.address}</p>
        )}

        <div className="complaint-card-footer">
          <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
          <span className="complaint-date">{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {dueDate && (
          <p className="complaint-due-date">
            Due: {new Date(dueDate).toLocaleString()}
          </p>
        )}

        {slaBreached && <span className="sla-alert">⚠ Overdue</span>}
      </div>
    </div>
  );
}
