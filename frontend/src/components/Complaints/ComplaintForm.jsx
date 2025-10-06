import React, { useState } from "react";
import { useComplaints } from "../../context/ComplaintContext.jsx";

export default function ComplaintForm() {
  const { createComplaint } = useComplaints();
  const [form, setForm] = useState({
    type: "pathway",
    description: "",
    latitude: "",
    longitude: "",
    address: "",
    photo: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    await createComplaint(formData);
    alert("Complaint submitted!");
    setForm({
      type: "pathway",
      description: "",
      latitude: "",
      longitude: "",
      address: "",
      photo: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-xl"
    >
      <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
      <label className="block mb-2 font-medium">Type</label>
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border rounded-md w-full mb-3 p-2"
      >
        <option value="pathway">Pathway</option>
        <option value="water">Water</option>
        <option value="garbage">Garbage</option>
        <option value="other">Other</option>
      </select>

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="border rounded-md w-full mb-3 p-2"
        rows="3"
      ></textarea>

      <label className="block mb-2 font-medium">Address</label>
      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        className="border rounded-md w-full mb-3 p-2"
      />

      <label className="block mb-2 font-medium">Photo (optional)</label>
      <input type="file" onChange={handleFile} className="mb-3" />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
