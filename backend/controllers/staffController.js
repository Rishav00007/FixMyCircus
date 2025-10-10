import Staff from "../models/Staff.js";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import asyncHandler from "express-async-handler";


export const getAllStaffUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "staff" }).select("name email");
  res.status(200).json({ success: true, users });
});

// Get users without Staff record (for admin assignment)
export const getUnassignedUsers = asyncHandler(async (req, res) => {
  const staffUsers = await Staff.find().select("staffUser");
  const staffUserIds = staffUsers.map((s) => s.staffUser.toString());

  const unassignedUsers = await User.find({
    role: "staff",
    _id: { $nin: staffUserIds },
  }).select("name email");

  res.status(200).json({ success: true, users: unassignedUsers });
});

// ✅ Get all staff users (only admin)
export const getAllStaff = asyncHandler(async (req, res) => {
  const staffList = await Staff.find()
    .populate("staffUser", "name email role")
    .populate("assignedComplaints", "type description status");
  res.status(200).json({ success: true, staffList });
});

export const assignDepartment = asyncHandler(async (req, res) => {
  const { userId, department } = req.body;

  const user = await User.findById(userId);
  if (!user || user.role !== "staff")
    return res.status(404).json({ message: "Staff user not found" });

  const existingStaff = await Staff.findOne({ staffUser: userId });
  if (existingStaff)
    return res
      .status(400)
      .json({ message: "This user already has a department assigned" });

  const staff = await Staff.create({
    staffUser: userId,
    department,
  });

  res.status(201).json({ success: true, staff });
});




// ✅ Create staff entry if not exists
export const registerStaff = asyncHandler(async (req, res) => {
  const { userId, department } = req.body;

  const existingStaff = await Staff.findOne({ staffUser: userId });
  if (existingStaff) {
    existingStaff.department = department;
    await existingStaff.save();
    return res.status(200).json({
      success: true,
      message: "Staff department updated successfully",
      staff: existingStaff,
    });
  }

  const newStaff = await Staff.create({ staffUser: userId, department });
  res.status(201).json({
    success: true,
    message: "Staff registered successfully",
    staff: newStaff,
  });
});

// ✅ Get all staff by department
export const getStaffByDepartment = asyncHandler(async (req, res) => {
  const { department } = req.params;
  const staffList = await Staff.find({ department })
    .populate("staffUser", "name email role")
    .populate("assignedComplaints", "type description status");
  res.status(200).json({ success: true, staffList });
});

// ✅ Assign complaint to staff
export const assignComplaintToStaff = asyncHandler(async (req, res) => {
  const { staffId, complaintId } = req.body;

  const staff = await Staff.findById(staffId);
  const complaint = await Complaint.findById(complaintId);

  if (!staff || !complaint) {
    return res.status(404).json({ message: "Staff or complaint not found" });
  }

  // Add complaint to staff
  if (!staff.assignedComplaints.includes(complaintId)) {
    staff.assignedComplaints.push(complaintId);
    await staff.save();
  }

  // Assign complaint to staff (Staff ID)
  complaint.assignedTo = staff._id;
  complaint.status = "IN_PROGRESS"; // optional
  await complaint.save();

  res.status(200).json({
    success: true,
    message: "Complaint assigned successfully",
  });
});

// ✅ Get all complaints assigned to a staff
export const getAssignedComplaints = asyncHandler(async (req, res) => {
  const staff = await Staff.findOne({ staffUser: req.user._id }).populate({
    path: "assignedComplaints",
    populate: { path: "citizen", select: "name email" },
  });

  if (!staff)
    return res.status(404).json({ message: "Staff record not found" });

  res.status(200).json({ success: true, complaints: staff.assignedComplaints });
});
