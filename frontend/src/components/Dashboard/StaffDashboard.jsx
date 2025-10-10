// // // import React from "react";
// // // import ComplaintList from "../Complaints/ComplaintList";
// // // import "./StaffDashboard.css";

// // // export default function StaffDashboard() {
// // //   return (
// // //     <div className="staff-dashboard">
// // //       <h1 className="dashboard-title">Assigned Complaints</h1>
// // //       <ComplaintList type="staff" />
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import staffService from "../../services/staffService";
// // import ComplaintCard from "../Complaints/ComplaintCard";
// // import "./StaffDashboard.css";

// // export default function StaffDashboard() {
// //   const [complaints, setComplaints] = useState([]);

// //   useEffect(() => {
// //     loadComplaints();
// //   }, []);

// //   const loadComplaints = async () => {
// //     const { data } = await staffService.getMyComplaints();
// //     setComplaints(data.complaints || []);
// //   };

// //   return (
// //     <div className="staff-dashboard">
// //       <h1>Assigned Complaints</h1>
// //       <div className="complaint-list">
// //         {complaints.length > 0 ? (
// //           complaints.map((c) => <ComplaintCard key={c._id} complaint={c} />)
// //         ) : (
// //           <p>No complaints assigned yet.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import staffService from "../../services/staffService";
// import ComplaintCard from "../Complaints/ComplaintCard";
// import "./StaffDashboard.css";

// export default function StaffDashboard() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadAssignedComplaints();
//   }, []);

//   const loadAssignedComplaints = async () => {
//     try {
//       const { data } = await staffService.getAssignedComplaints();
//       setComplaints(data.complaints || []);
//     } catch (error) {
//       console.error("Error fetching assigned complaints:", error);
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading assigned complaints...</p>;

//   return (
//     <div className="staff-dashboard">
//       <h1>Assigned Complaints</h1>
//       <div className="complaint-list">
//         {complaints.length > 0 ? (
//           complaints.map((c) => <ComplaintCard key={c._id} complaint={c} />)
//         ) : (
//           <p>No complaints assigned yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import staffService from "../../services/staffService";
import ComplaintCard from "../Complaints/ComplaintCard";
import "./StaffDashboard.css";

export default function StaffDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAssignedComplaints();
  }, []);

  const loadAssignedComplaints = async () => {
    try {
      const { data } = await staffService.getAssignedComplaints();
      // Only include complaints assigned to the logged-in staff
      setComplaints(data.complaints || []);
    } catch (error) {
      console.error("Error fetching assigned complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading assigned complaints...</p>;

  return (
    <div className="staff-dashboard">
      <h1>Assigned Complaints</h1>
      <div className="complaint-list">
        {complaints.length > 0 ? (
          complaints.map((c) => <ComplaintCard key={c._id} complaint={c} onClick={(id) => navigate(`/complaints/${id}`)}/>)
        ) : (
          <p>No complaints assigned yet.</p>
        )}
      </div>
    </div>
  );
}
