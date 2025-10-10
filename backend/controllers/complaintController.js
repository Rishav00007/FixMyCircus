import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { uploadOnCLoudinary } from "../config/cloudinaryConfig.js";
import sendEmail from "../utils/sendEmail.js";

export const createComplaint = asyncHandler(async (req, res) => {
  const { type, description, latitude, longitude, address } = req.body;

  if (!type || !description) {
    return res
      .status(400)
      .json({ message: "Type and Description are required" });
  }

  let photoUrl = "";
  if (req.file) {
    const result = await uploadOnCLoudinary(req.file.path);
    if (result) photoUrl = result.secure_url || result.url;
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
  }

  const complaint = await Complaint.create({
    citizen: req.user._id,
    type,
    description,
    photo: photoUrl,
    location: { latitude, longitude, address },
  });

  return res.status(201).json({
    success: true,
    message: "Complaint Submitted Successfully",
    complaint,
  });
});

export const getAllComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find()
    .populate("citizen", "name email")
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    complaints,
  });
});

export const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ citizen: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    complaints,
  });
});

export const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, resolutionNote, assignedTo } = req.body;
  const complaint = await Complaint.findById(id).populate(
    "citizen",
    "name email"
  );
  if (!complaint) {
    return res.status(404).json({
      message: "Complaint not Found",
    });
  }
  if (status) complaint.status = status;
  if (resolutionNote) complaint.resolutionNote = resolutionNote;
  if (assignedTo) complaint.assignedTo = assignedTo;
  await complaint.save();
  if (status) {
    const userEmail = complaint.citizen.email;
    const subject = `Your Complaint Status Updated`;
    const text = `Hello ${complaint.citizen.name}, your complaint (${complaint._id}) status has been updated to ${status}.`;
    const html = `
      <p>Dear <strong>${complaint.citizen.name}</strong>,</p>
      <p>The status of your complaint <strong>${complaint._id}</strong> has been updated to:</p>
      <h3 style="color: #2b6cb0;">${status}</h3>
      <p><strong>Description:</strong> ${complaint.description}</p>
      ${
        resolutionNote
          ? `<p><strong>Resolution Note:</strong> ${resolutionNote}</p>`
          : ""
      }
      <p>Thank you for your patience.<br/>— Grievance Redressal Team</p>
    `;

    // Use sendEmail utility
    try {
      await sendEmail({ to: userEmail, subject, text, html });
      console.log(`Complaint update email sent to ${userEmail}`);
    } catch (err) {
      console.error("Failed to send status update email:", err.message);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Complaint updated Successfully & user notified",
    complaint,
  });
});
export const deleteComplaint = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const complaint = await Complaint.findById(id);
  if (!complaint)
    return res.status(404).json({ message: "Complaint not found" });
  await complaint.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Complaint Deleted",
  });
});
export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate("citizen", "name email")
    .populate("assignedTo", "name email role");
  if (!complaint)
    return res.status(404).json({ message: "Complaint not found" });
  res.status(200).json({ success: true, complaint });
});
