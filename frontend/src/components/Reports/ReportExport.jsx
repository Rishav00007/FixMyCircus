// frontend/src/components/reports/ReportExport.jsx
import React, { useState } from "react";
import reportService from "../../services/reportService.js";
import { useNavigate } from "react-router-dom";

const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export default function ReportExport() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
    type: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const { data } = await reportService.generateReport(filters);
      setMessage("Report generated successfully");
      // navigate to report details or list
      navigate(`/reports/${data.report._id}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to generate report");
    }
  };

  const handleExportCSV = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await reportService.exportReportsCSV(filters);
      downloadBlob(res.data, `complaints_export_${Date.now()}.csv`);
      setMessage("CSV downloaded");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to export CSV");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Filter Reports</h2>

      <form className="space-y-3">
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
        </div>

        <div className="flex gap-2">
          <select name="status" value={filters.status} onChange={handleChange} className="border p-2 rounded w-1/2">
            <option value="">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>

          <select name="type" value={filters.type} onChange={handleChange} className="border p-2 rounded w-1/2">
            <option value="">All Types</option>
            <option value="pathway">pathway</option>
            <option value="water">water</option>
            <option value="garbage">garbage</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="flex gap-3 mt-3">
          <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">
            Generate Report (save)
          </button>
          <button onClick={handleExportCSV} className="bg-green-600 text-white px-4 py-2 rounded">
            Export CSV (ad-hoc)
          </button>
        </div>

        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
