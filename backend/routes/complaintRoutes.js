import express from "express";
import { createComplaint, getAllComplaints,getMyComplaints,updateComplaintStatus,deleteComplaint } from "../controllers/complaintController.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/",upload.single("photo"),createComplaint);
router.get("/",getAllComplaints);
router.get("/my",getMyComplaints);
router.put("/:id",updateComplaintStatus);
router.delete("/:id",deleteComplaint);

export default router;