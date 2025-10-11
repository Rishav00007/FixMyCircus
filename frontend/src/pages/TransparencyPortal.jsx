import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api.js";
import "./TransparencyPortal.css";

export default function TransparencyPortal() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { data } = await API.get("/public/stats");
    setStats(data);
  };

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="transparency-portal">
      <h1>Complaint Transparency Portal</h1>
      <div className="stats-grid">
        <div className="stat-box">
          <h2>{stats.total}</h2>
          <p>Total Complaints</p>
        </div>
        <div className="stat-box">
          <h2>{stats.resolved}</h2>
          <p>Resolved Complaints</p>
        </div>
        <div className="stat-box">
          <h2>{stats.pending}</h2>
          <p>Pending Complaints</p>
        </div>
        <div className="stat-box">
          <h2>{stats.avgResolutionTime} hrs</h2>
          <p>Avg. Resolution Time</p>
        </div>
      </div>
    </div>
  );
}
