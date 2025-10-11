import React from "react";
import "./Pages.css";

export default function Contact() {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-description">
        Have questions, feedback, or issues? Reach out to us and we’ll respond
        as quickly as possible.
      </p>

      <div className="contact-info">
        <p>Email: support@fixmycircus.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123 Circus Street, Cityville, India</p>
      </div>
    </div>
  );
}
