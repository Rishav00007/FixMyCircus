import API from "./api";

const complaintService = {
  createComplaint: (formData) =>
    API.post("/complaints", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Accept optional query string for filtering by type
  getAllComplaints: (query = "") => API.get(`/complaints${query}`),

  getMyComplaints: () => API.get("/complaints/my"),
  getComplaintById: (id) => API.get(`/complaints/${id}`),
  getUnassignedComplaints: () => API.get("/complaints/unassigned"),
  updateComplaintStatus: (id, data) => API.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => API.delete(`/complaints/${id}`),
};

export default complaintService;
