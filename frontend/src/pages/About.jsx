import React from "react";
import "./Pages.css";

export default function About() {
  return (
    <div className="page-container">
      <h1 className="page-title">About The Fix My Circus</h1>
      <p className="page-description">
        Fix My Circus is a smart grievance tracking system designed to make
        urban management seamless and efficient. Citizens can report issues,
        track their status, and ensure timely resolution. Staff and
        administrators can efficiently manage complaints, assign tasks, and
        analyze trends for better decision-making.
      </p>
      <p className="page-description">
        Our mission is to keep the city functioning smoothly, empower citizens,
        and make public service transparent and accountable.
      </p>
    </div>
  );
}
