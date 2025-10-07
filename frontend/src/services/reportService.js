// import API from "./api";

// const reportService = {
//   exportComplaintsCSV: async () => {
//     const res = await API.get("/complaints/export/csv", { responseType: "blob" });
//     const url = window.URL.createObjectURL(new Blob([res.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "complaints_report.csv");
//     document.body.appendChild(link);
//     link.click();
//   },
// };

// export default reportService;


// frontend/src/services/reportService.js
import API from "./api.js";

/**
 * generateReport(filters) -> POST /api/reports
 * filters: { startDate, endDate, status, type }
 */
const generateReport = (filters) => API.post("/reports", filters);

/**
 * getAllReports() -> GET /api/reports
 */
const getAllReports = () => API.get("/reports");

/**
 * getReportById(id) -> GET /api/reports/:id
 */
const getReportById = (id) => API.get(`/reports/${id}`);

/**
 * deleteReport(id) -> DELETE /api/reports/:id
 */
const deleteReport = (id) => API.delete(`/reports/${id}`);

/**
 * exportReportsCSV(filters) -> GET /api/reports/export (response blob)
 */
const exportReportsCSV = (filters) =>
  API.get("/reports/export", { params: filters, responseType: "blob" });

/**
 * exportReportById(id) -> GET /api/reports/:id/export (response blob)
 */
const exportReportById = (id) =>
  API.get(`/reports/${id}/export`, { responseType: "blob" });

export default {
  generateReport,
  getAllReports,
  getReportById,
  deleteReport,
  exportReportsCSV,
  exportReportById,
};
