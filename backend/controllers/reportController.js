import Complaint from "../models/Complaint.js";
import Report from "../models/Report.js";
import asyncHandler from "express-async-handler";

export const generateReport = asyncHandler(async(req,res)=>{
    const {startDate, endDate, status, type}= req.body;
    const query = {};
    if(startDate && endDate){
        query.createdAt={
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }

    if(status) query.status= status;
    if(type) query.type= type;

    const complaints = await Complaint.find(query);
    if(complaints.length===0){
        return res
        .status(404)
        .json({message:"No Complaints found for the selected filters"});
    }

    const totalComplaints = complaints.length;
    const resolvedCount = complaints.filter((c)=> c.status==="resolved").length;
    const pendingCount = complaints.filter((c)=>c.status==="pending").length;

    const report = await Report.create({
        generatedBy:req.user._id,
        complaints:complaints.map((c)=> c._id),
        totalComplaints,
        resolvedCount,
        pendingCount,
    });

    return res.status(201).json({
        success: true,
        message:"Reported generated successfully",
        report,
    });
});

export const getAllReports = asyncHandler(async(req,res)=>{
    const reports = await Report.find()
    .populate("generatedBy", "name email role")
    .populate({
        path:"complaints",
        populate:{path:"citizen", select:"name email"},
    })
    .sort({generatedDate: -1});

    return res.status(200).json({
        success:true,
        count: reports.length,
        reports,
    });
});

export const getReportById = asyncHandler(async(req,res)=>{
    const report = await Report.findById(req.params.id)
    .populate("generatedBy", "name email")
    .populate({
        path:"complaints",
        populate:{path:"citizen" , select:"name email"},
    });
    if(!report){
        return res.status(404).json({
            message:"Report not found"
        });
    }

    return res.status(201).json({
        success:true,
        report,
    });
});

export const deleteReport = asyncHandler(async(req,res)=>{
    const report = await Report.findById(req.params.id);

    if(!report){
        return res.status(404).json({
            message:"Report not found"
        })
    }

    await report.deleteOne();
    return res.status(200).json({
        success:true,
        message: "Report deleted Successfully",
    });
});

