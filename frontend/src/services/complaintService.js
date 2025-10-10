import API from "./api";

const complaintService = {
  createComplaint: (formData) =>
    API.post("/complaints", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getAllComplaints: () => API.get("/complaints"),
  getMyComplaints: () => API.get("/complaints/my"),
  getComplaintById: (id) => API.get(`/complaints/${id}`),
  getUnassignedComplaints: () => API.get("/complaints/unassigned"),
  updateComplaintStatus: (id, data) => API.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => API.delete(`/complaints/${id}`),
  // Get complaint by ID
  getComplaintById: (id) => API.get(`/complaints/${id}`),
};

export default complaintService;
