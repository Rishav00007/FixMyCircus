// frontend/src/components/reports/ReportPage.jsx
import React, { useEffect, useState } from "react";
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

export default function ReportPage() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const loadReports = async () => {
    try {
      const { data } = await reportService.getAllReports();
      setReports(data.reports || []);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleExport = async (id) => {
    try {
      const res = await reportService.exportReportById(id);
      downloadBlob(res.data, `report_${id}_${Date.now()}.csv`);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this report?")) return;
    try {
      await reportService.deleteReport(id);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button onClick={() => navigate("/reports/new")} className="bg-blue-600 text-white px-4 py-2 rounded">
          New Report
        </button>
      </div>

      {reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reports.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">Report: {new Date(r.generatedDate).toLocaleString()}</h3>
              <p>Total: {r.totalComplaints} • Resolved: {r.resolvedCount} • Pending: {r.pendingCount}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => navigate(`/reports/${r._id}`)} className="px-3 py-1 bg-gray-200 rounded">
                  View
                </button>
                <button onClick={() => handleExport(r._id)} className="px-3 py-1 bg-green-600 text-white rounded">
                  Export CSV
                </button>
                <button onClick={() => handleDelete(r._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
