import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import asyncHandler from 'express-async-handler';
import fs from 'fs';
import { uploadOnCLoudinary } from "../config/cloudinaryConfig.js";

export const createComplaint = asyncHandler( async(req,res)=>{
   const {type , description , latitude , longitude, address} = req.body;

   if(!type || !description){
    return res.status(400).json({ message:"Type and Description are required"});
   }

   let photoUrl="";
   if(req.file){
    const result = await uploadOnCLoudinary(req.file.path);
    if(result) photoUrl = result.secure_url || result.url;
    if(fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
   }

   const complaint = await Complaint.create({
    citizen: req.user._id,
    type,
    description,
    photo:photoUrl,
    location: {latitude , longitude , address}
   });

   return res.status(201).json({
    success: true,
    message:"Complaint Submitted Successfully",
    complaint,
   });
});

export const getAllComplaints = asyncHandler(async (req,res)=>{
    const complaints = await Complaint.find()
    .populate("citizen", "name email")
    .populate("assignedTo","name email role")
    .sort({createdAt: -1});

    return res.status(200).json({
        success:true,
        complaints
    });
});

export const getMyComplaints = asyncHandler(async(req,res)=>{
    const complaints = await Complaint.find({citizen:req.user._id}).sort({
        createdAt:-1,
    });
    res.status(200).json({
        success:true,
        complaints
    });
});

export const updateComplaintStatus = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {status, resolutionNote, assignedTo} = req.body;
    const complaint = await Complaint.findById(id);
    if(!complaint){
        return res.status(404).json({
            message:"Complaint not Found"
        })
    }
    if(status) complaint.status=status;
    if(resolutionNote) complaint.resolutionNote=resolutionNote;
    if(assignedTo) complaint.assignedTo=assignedTo;
    await complaint.save();
    return res.status(200).json({
        success:true,
        message:"Complaint updated Successfully",
        complaint,
    });
});

export const deleteComplaint = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const complaint = await Complaint.findById(id);
    if(!complaint) return res.status(404).json({message:"Complaint not found"});
    await complaint.deleteOne();
    return res.status(200).json({
        success:true,
        message:"Complaint Deleted"
    });
});