// import Complaint from "../models/Complaint.js";
// import Report from "../models/Report.js";
// import asyncHandler from "express-async-handler";

// export const generateReport = asyncHandler(async(req,res)=>{
//     const {startDate, endDate, status, type}= req.body;
//     const query = {};
//     if(startDate && endDate){
//         query.createdAt={
//             $gte: new Date(startDate),
//             $lte: new Date(endDate),
//         };
//     }

//     if(status) query.status= status;
//     if(type) query.type= type;

//     const complaints = await Complaint.find(query);
//     if(complaints.length===0){
//         return res
//         .status(404)
//         .json({message:"No Complaints found for the selected filters"});
//     }

//     const totalComplaints = complaints.length;
//     const resolvedCount = complaints.filter((c)=> c.status==="resolved").length;
//     const pendingCount = complaints.filter((c)=>c.status==="pending").length;

//     const report = await Report.create({
//         generatedBy:req.user._id,
//         complaints:complaints.map((c)=> c._id),
//         totalComplaints,
//         resolvedCount,
//         pendingCount,
//     });

//     return res.status(201).json({
//         success: true,
//         message:"Reported generated successfully",
//         report,
//     });
// });

// export const getAllReports = asyncHandler(async(req,res)=>{
//     const reports = await Report.find()
//     .populate("generatedBy", "name email role")
//     .populate({
//         path:"complaints",
//         populate:{path:"citizen", select:"name email"},
//     })
//     .sort({generatedDate: -1});

//     return res.status(200).json({
//         success:true,
//         count: reports.length,
//         reports,
//     });
// });

// export const getReportById = asyncHandler(async(req,res)=>{
//     const report = await Report.findById(req.params.id)
//     .populate("generatedBy", "name email")
//     .populate({
//         path:"complaints",
//         populate:{path:"citizen" , select:"name email"},
//     });
//     if(!report){
//         return res.status(404).json({
//             message:"Report not found"
//         });
//     }

//     return res.status(201).json({
//         success:true,
//         report,
//     });
// });

// export const deleteReport = asyncHandler(async(req,res)=>{
//     const report = await Report.findById(req.params.id);

//     if(!report){
//         return res.status(404).json({
//             message:"Report not found"
//         })
//     }

//     await report.deleteOne();
//     return res.status(200).json({
//         success:true,
//         message: "Report deleted Successfully",
//     });
// });







// backend/controllers/reportController.js
import Complaint from "../models/Complaint.js";
import Report from "../models/Report.js";
import asyncHandler from "express-async-handler";

/**
 * Helper to normalize incoming status/type values
 */
const normalizeStatus = (status) => {
  if (!status) return undefined;
  return String(status).toUpperCase();
};

const normalizeType = (type) => {
  if (!type) return undefined;
  return String(type).toLowerCase();
};

// POST /api/reports
export const generateReport = asyncHandler(async (req, res) => {
  const { startDate, endDate, status, type } = req.body;
  const query = {};

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  } else if (startDate) {
    query.createdAt = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.createdAt = { $lte: new Date(endDate) };
  }

  // normalize status and type
  const normStatus = normalizeStatus(status);
  if (normStatus) {
    // only accept allowed statuses
    const allowed = ["OPEN", "IN_PROGRESS", "RESOLVED"];
    if (allowed.includes(normStatus)) query.status = normStatus;
  }

  const normType = normalizeType(type);
  if (normType) {
    // complaint.type enums are lower-case like 'pathway', 'water', etc.
    query.type = normType;
  }

  const complaints = await Complaint.find(query);

  if (!complaints || complaints.length === 0) {
    return res
      .status(404)
      .json({ message: "No complaints found for the selected filters" });
  }

  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "RESOLVED").length;
  const pendingCount = totalComplaints - resolvedCount;

  const report = await Report.create({
    generatedBy: req.user._id,
    complaints: complaints.map((c) => c._id),
    totalComplaints,
    resolvedCount,
    pendingCount,
  });

  return res.status(201).json({
    success: true,
    message: "Report generated successfully",
    report,
  });
});

// GET /api/reports
export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find()
    .populate("generatedBy", "name email role")
    .populate({
      path: "complaints",
      populate: { path: "citizen", select: "name email" },
    })
    .sort({ generatedDate: -1 });

  return res.status(200).json({
    success: true,
    count: reports.length,
    reports,
  });
});

// GET /api/reports/:id
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate("generatedBy", "name email")
    .populate({
      path: "complaints",
      populate: { path: "citizen", select: "name email" },
    });

  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }

  return res.status(200).json({ success: true, report });
});

// DELETE /api/reports/:id
export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    return res.status(404).json({ message: "Report not found" });
  }
  await report.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Report deleted successfully",
  });
});

/**
 * Export CSV from ad-hoc filters (same filters as generateReport)
 * GET /api/reports/export?startDate=&endDate=&status=&type=
 */
export const exportReportsCSV = asyncHandler(async (req, res) => {
  const { startDate, endDate, status, type } = req.query;
  const query = {};

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  } else if (startDate) {
    query.createdAt = { $gte: new Date(startDate) };
  } else if (endDate) {
    query.createdAt = { $lte: new Date(endDate) };
  }

  const normStatus = normalizeStatus(status);
  if (normStatus) {
    const allowed = ["OPEN", "IN_PROGRESS", "RESOLVED"];
    if (allowed.includes(normStatus)) query.status = normStatus;
  }

  const normType = normalizeType(type);
  if (normType) query.type = normType;

  const complaints = await Complaint.find(query)
    .populate("citizen", "name email")
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  if (!complaints || complaints.length === 0) {
    return res.status(404).json({ message: "No complaints found for export" });
  }

  // CSV header
  const headers = [
    "id",
    "type",
    "description",
    "status",
    "priority",
    "address",
    "latitude",
    "longitude",
    "createdAt",
    "citizenName",
    "citizenEmail",
    "assignedToName",
    "assignedToEmail",
    "resolutionNote",
    "photo",
  ];

  const escape = (val) => {
    if (val === null || val === undefined) return "";
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = complaints.map((c) =>
    [
      escape(c._id),
      escape(c.type),
      escape(c.description),
      escape(c.status),
      escape(c.priority),
      escape(c.location?.address),
      escape(c.location?.latitude),
      escape(c.location?.longitude),
      escape(c.createdAt?.toISOString()),
      escape(c.citizen?.name),
      escape(c.citizen?.email),
      escape(c.assignedTo?.name),
      escape(c.assignedTo?.email),
      escape(c.resolutionNote),
      escape(c.photo),
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=complaints_export_${Date.now()}.csv`
  );
  res.status(200).send(csv);
});

/**
 * Export CSV from an existing saved Report (by ID)
 * GET /api/reports/:id/export
 */
export const exportReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id).populate({
    path: "complaints",
    populate: [
      { path: "citizen", select: "name email" },
      { path: "assignedTo", select: "name email" },
    ],
  });

  if (!report || !report.complaints || report.complaints.length === 0) {
    return res.status(404).json({ message: "No complaints found in this report" });
  }

  const headers = [
    "id",
    "type",
    "description",
    "status",
    "priority",
    "address",
    "latitude",
    "longitude",
    "createdAt",
    "citizenName",
    "citizenEmail",
    "assignedToName",
    "assignedToEmail",
    "resolutionNote",
    "photo",
  ];

  const escape = (val) => {
    if (val === null || val === undefined) return "";
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = report.complaints.map((c) =>
    [
      escape(c._id),
      escape(c.type),
      escape(c.description),
      escape(c.status),
      escape(c.priority),
      escape(c.location?.address),
      escape(c.location?.latitude),
      escape(c.location?.longitude),
      escape(c.createdAt?.toISOString()),
      escape(c.citizen?.name),
      escape(c.citizen?.email),
      escape(c.assignedTo?.name),
      escape(c.assignedTo?.email),
      escape(c.resolutionNote),
      escape(c.photo),
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=report_${report._id}_${Date.now()}.csv`
  );
  res.status(200).send(csv);
});

