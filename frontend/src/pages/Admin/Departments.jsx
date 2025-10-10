// frontend/src/pages/Admin/Departments.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Departments.css";

const departments = ["pathway", "water", "garbage", "general"];

export default function Departments() {
  return (
    <div className="departments-page">
      <h1>Departments</h1>
      <div className="department-grid">
        {departments.map((dept) => (
          <Link
            key={dept}
            to={`/department/${dept.toLowerCase()}`}
            className="department-card"
          >
            {dept}
          </Link>
        ))}
      </div>
    </div>
  );
}
