import React, { createContext, useContext, useState, useEffect } from "react";
import complaintService from "../services/complaintService";
import { useAuth } from "./AuthContext";

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async (type) => {
    setLoading(true);
    try {
      let res;
      if (user.role === "citizen") res = await complaintService.getMyComplaints();
      else if (user.role === "staff") res = await complaintService.getAllComplaints();
      else if (user.role === "admin") res = await complaintService.getAllComplaints();

      setComplaints(res?.data?.complaints || []);
    } catch (err) {
      console.error("Failed to load complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  const createComplaint = async (data) => {
    const res = await complaintService.createComplaint(data);
    if (res.data.success) setComplaints((prev) => [res.data.complaint, ...prev]);
  };

  const updateComplaint = async (id, data) => {
    const res = await complaintService.updateComplaintStatus(id, data);
    if (res.data.success) {
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? res.data.complaint : c))
      );
    }
  };

  const deleteComplaint = async (id) => {
    await complaintService.deleteComplaint(id);
    setComplaints((prev) => prev.filter((c) => c._id !== id));
  };

  useEffect(() => {
    if (user) fetchComplaints();
  }, [user]);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        loading,
        fetchComplaints,
        createComplaint,
        updateComplaint,
        deleteComplaint,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);
