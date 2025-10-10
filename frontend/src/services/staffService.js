import API from "./api.js";

const getAllStaffUsers = () => API.get("/staff/users"); // admin manage staff page
const getUnassignedUsers = () => API.get("/staff/unassigned");
const getAllStaff = () => API.get("/staff");
const assignDepartment = (userId, department) =>
  API.put("/staff/assign", { userId, department });
const registerStaff = (userId, department) =>
  API.post("/staff", { userId, department });
const getStaffByDepartment = (department) =>
  API.get(`/staff/department/${department}`);
const assignComplaintToStaff = (staffId, complaintId) =>
  API.post("/staff/assign-complaint", { staffId, complaintId });
const getMyComplaints = () => API.get("/staff/my-complaints");
const getAssignedComplaints = () => API.get("/staff/my-complaints"); // staff dashboard
export default {
  getAllStaffUsers,
  getUnassignedUsers,
  getAllStaff,
  assignDepartment,
  registerStaff,
  getStaffByDepartment,
  assignComplaintToStaff,
  getMyComplaints,
  getAssignedComplaints,
};
