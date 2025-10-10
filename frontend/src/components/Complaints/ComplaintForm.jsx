import React, { useState } from "react";
import { useComplaints } from "../../context/ComplaintContext.jsx";
import "./ComplaintForm.css";
import ComplaintMapPicker from "./ComplaintMapPicker.jsx";

export default function ComplaintForm() {
  const { createComplaint, loading, message } = useComplaints();

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    latitude: "",
    longitude: "",
    address: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  
  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      await createComplaint(data);
      alert("Complaint submitted successfully!");
      setFormData({
        type: "",
        description: "",
        latitude: "",
        longitude: "",
        address: "",
        photo: null,
      });
    } catch {
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="complaint-form-container">
      <h2 className="complaint-form-title">Submit a New Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Complaint Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select type</option>
            <option value="pathway">Pathway</option>
            <option value="water">Water</option>
            <option value="garbage">Garbage</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the issue..."
            required
          />
        </div>

  <ComplaintMapPicker onLocationSelect={handleLocationSelect} />

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter location or address"
          />
        </div>

        <div className="form-group">
          <label>Upload Photo (optional)</label>
          <input type="file" name="photo" onChange={handleChange} />
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
